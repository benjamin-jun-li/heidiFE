import { CircleStop, Mic, Pause, Play, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import useRecordingStore, { RecordingStatus } from "@/store/recording-store";
import useTranscribeStore, { TranscribeStatus } from "@/store/transcribe-store";
import Hint from "../hint";
import useAudioRecorder from "@/hooks/useAudioRecorder";

const RecordHandler = () => {
  const { recordingStatus } = useRecordingStore();
  const { transcribeStatus, onTranscribeStatusChange } = useTranscribeStore();
  const { startRecording, pauseRecording, stopRecording, resumeRecording } = useAudioRecorder();

  const disabledStatuses = {
    start: [RecordingStatus.Recording, RecordingStatus.Paused],
    pause: [RecordingStatus.NotRecording, RecordingStatus.Finished],
    stop: [RecordingStatus.NotRecording, RecordingStatus.Finished],
  };
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Audio Recorder</h2>
      <div className="flex items-center space-x-4">
        <Hint label="Start recording" align="start" alignOffset={-65}>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => startRecording()}
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
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => {
              if (recordingStatus === RecordingStatus.Paused) {
                resumeRecording();
                return;
              }
              pauseRecording();
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
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => stopRecording()}
            disabled={disabledStatuses.stop.includes(recordingStatus)}
          >
            <CircleStop className="h-6 w-6" />
          </Button>
        </Hint>
        <Hint label="Convert to text" align="start" alignOffset={-65}>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => onTranscribeStatusChange(TranscribeStatus.Loading)}
            disabled={
              transcribeStatus !== TranscribeStatus.NotTranscribing ||
              recordingStatus !== RecordingStatus.Finished
            }
          >
            <ScanText className="h-6 w-6" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default RecordHandler;
