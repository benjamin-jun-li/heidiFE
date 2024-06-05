import useRecordingStore from "@/store/recording-store";

const AudioPlayer = () => {
  const { audio } = useRecordingStore();
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-full">
      <h3 className="text-lg font-medium mb-2">Audio Playback</h3>
      <div className="flex items-center justify-center h-16">
        <audio controls className="w-full">
          <source
            src={audio ? URL.createObjectURL(audio) : ""}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
