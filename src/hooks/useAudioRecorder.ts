import { useState, useRef } from "react";
import useRecordingStore, { RecordingStatus } from "@/store/recording-store";
import useTranscribeStore, { TranscribeStatus } from "@/store/transcribe-store";

const useAudioRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const { onRecordingStatusChange, setAudio } = useRecordingStore();
  const { onTranscribeStatusChange } = useTranscribeStore();
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const newRecorder = new MediaRecorder(stream);
    newRecorder.ondataavailable = (e) => audioChunks.current.push(e.data);
    newRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudio(audioBlob);
      audioChunks.current = [];
    };
    newRecorder.start();
    setRecorder(newRecorder);
    onRecordingStatusChange(RecordingStatus.Recording);
    onTranscribeStatusChange(TranscribeStatus.NotTranscribing);
  };

  const pauseRecording = () => {
    if (recorder) {
      recorder.pause();
      onRecordingStatusChange(RecordingStatus.Paused);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      onRecordingStatusChange(RecordingStatus.Finished);
    }
  };

  const resumeRecording = () => {
    if (recorder) {
      recorder.resume();
      onRecordingStatusChange(RecordingStatus.Recording);
    }
  };

  return {
    startRecording,
    pauseRecording,
    stopRecording,
    resumeRecording,
  };
};

export default useAudioRecorder;

