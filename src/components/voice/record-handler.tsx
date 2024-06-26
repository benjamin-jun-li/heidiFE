import { CircleStop, Mic, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import useRecordingStore, { RecordingStatus } from "@/store/recording-store";
import Hint from "../hint";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import useSpeechRecognition from "@/hooks/useWebSpeech";
import { toast } from "sonner";

const RecordHandler = () => {
  const { recordingStatus } = useRecordingStore();
  const { startRecording, pauseRecording, stopRecording, resumeRecording } =
    useAudioRecorder();
  const {
    startRecognition,
    stopRecognition,
    pauseRecognition,
    resumeRecognition,
  } = useSpeechRecognition();

  const disabledStatuses = {
    start: [RecordingStatus.Recording, RecordingStatus.Paused],
    pause: [RecordingStatus.NotRecording, RecordingStatus.Finished],
    stop: [RecordingStatus.NotRecording, RecordingStatus.Finished],
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-700">Audio Recorder</h2>
      <div className="flex items-center space-x-4">
        <Hint label="Start recording" align="start" alignOffset={-65}>
          <Button
            variant="ghost"
            aria-label="start-recording"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            onClick={async () => {
              try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                startRecording();
                startRecognition();
              } catch (error) {
                toast.error("Microphone permission is required to record audio");
              }
            }}
            disabled={disabledStatuses.start.includes(recordingStatus)}
          >
            <Mic className="h-6 w-6" />
          </Button>
        </Hint>
        <Hint
          label={
            recordingStatus === RecordingStatus.Paused
              ? "Resume recording"
              : "Pause recording"
          }
          align="start"
          alignOffset={-65}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="pause-recording"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              if (recordingStatus === RecordingStatus.Paused) {
                resumeRecording();
                resumeRecognition();
                return;
              }
              pauseRecording();
              pauseRecognition();
            }}
            disabled={disabledStatuses.pause.includes(recordingStatus)}
          >
            {recordingStatus === RecordingStatus.Paused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </Hint>
        <Hint label="Stop recording" align="start" alignOffset={-65}>
          <Button
            variant="ghost"
            size="icon"
            aria-label="stop-recording"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              stopRecording();
              stopRecognition();
            }}
            disabled={disabledStatuses.stop.includes(recordingStatus)}
          >
            <CircleStop className="h-6 w-6" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default RecordHandler;
