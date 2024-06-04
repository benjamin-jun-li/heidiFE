import AudioPlayer from "./audio-player";
import RecordHandler from "./record-handler";
import useRecordingStore, { RecordingStatus } from "@/store/recording-store";
import TranscribeHandler from "./transcribe-handler";
import useOffline from "@/hooks/useOffline";

const VoiceHandler = () => {
  const { recordingStatus } = useRecordingStore();
  const isOffline = useOffline();

  const renderContent = {
    [RecordingStatus.NotRecording]: (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Your recorded audio will be transcribed and displayed here.
        </p>
      </div>
    ),
    [RecordingStatus.Paused]: (
      <div className="bg-yellow-100 dark:bg-yellow-800 rounded-lg p-4">
        <p className="text-yellow-500 dark:text-yellow-400 text-sm">
          Recording paused
        </p>
      </div>
    ),
    [RecordingStatus.Recording]: (
      <div className="bg-red-100 dark:bg-red-800 rounded-lg p-4">
        <p className="text-red-500 dark:text-red-400 text-sm">
          Recording in progress
        </p>
      </div>
    ),
    // Don't render transcribe handler if offline
    [RecordingStatus.Finished]: <div className="space-y-4">
      <AudioPlayer />
      {!isOffline && <TranscribeHandler />}
    </div>,
  };

  return (
    <section className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 max-w-md mx-auto">
      <RecordHandler />
      {renderContent[recordingStatus]}
    </section>
  );
};

export default VoiceHandler;
