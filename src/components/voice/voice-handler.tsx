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
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-gray-500 text-sm">
          Your recorded audio will be transcribed and displayed here. <br />
          You need to allow microphone access to start recording. <br />
          If you accidentally denied access, you can change it in your browser
          settings, then refresh the page.
        </p>
      </div>
    ),
    [RecordingStatus.Paused]: (
      <div className="bg-yellow-100 rounded-lg p-4">
        <p className="text-yellow-500 text-sm">Recording paused</p>
      </div>
    ),
    [RecordingStatus.Recording]: (
      <div className="bg-red-100 rounded-lg p-4">
        <p className="text-red-500 text-sm">Recording in progress</p>
      </div>
    ),
    // Don't render transcribe handler if offline
    [RecordingStatus.Finished]: (
      <div className="space-y-4">
        <AudioPlayer />
        {!isOffline ? (
          <TranscribeHandler />
        ) : (
          <div className="bg-red-100 rounded-lg p-4">
            <p className="text-red-500 text-sm">
              You are currently offline, the transcribed text from your voice
              will be automatically processed once you are online
            </p>
          </div>
        )}
      </div>
    ),
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <RecordHandler />
      {renderContent[recordingStatus]}
    </section>
  );
};

export default VoiceHandler;
