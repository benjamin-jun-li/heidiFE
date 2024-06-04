import { useEffect, useState } from "react";
import useTranscribeStore, { TranscribeStatus } from "@/store/transcribe-store";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

type RecognitionEvent = typeof window.webkitSpeechRecognition.event

const useSpeechRecognition = () => {
  const { setTranscribedText, onTranscribeStatusChange } = useTranscribeStore();
  const [recognition, setRecognition] = useState<typeof window.webkitSpeechRecognition>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Web Speech API. Please use Chrome.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => {
      onTranscribeStatusChange(TranscribeStatus.Loading);
    };

    recognitionInstance.onresult = (event: RecognitionEvent) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        const transcript: string = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      setTranscribedText(finalTranscript);
    };

    recognitionInstance.onerror = (event: RecognitionEvent) => {
      console.error(event.error);
      onTranscribeStatusChange(TranscribeStatus.NotTranscribing);
    };

    recognitionInstance.onend = () => {
      
      onTranscribeStatusChange(TranscribeStatus.Finished);
    };

    setRecognition(recognitionInstance);
  }, [onTranscribeStatusChange, setTranscribedText]);

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
      setTranscribedText("", false);
      console.log("Recognition started");
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      console.log("Recognition stopped");
    }
  };

  const pauseRecognition = () => {
    if (recognition) {
      recognition.stop();
      console.log("Recognition paused");
    }
  };

  const resumeRecognition = () => {
    if (recognition) {
      recognition.start();
      console.log("Recognition resumed");
    }
  };

  return {
    startRecognition,
    stopRecognition,
    pauseRecognition,
    resumeRecognition,
  };
};

export default useSpeechRecognition;
