import AudioPlayer from "./audio-player";
import RecordHandler from "./record-handler";
import { useStore } from "zustand";
import useRecordingStore from "@/store/recording-store";

const Recorder = () => {
  const { isRecording } = useStore(useRecordingStore);
  
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 max-w-md mx-auto">
      <RecordHandler />
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
        Your recorded audio will be transcribed and displayed here.
        </p>
      </div>
      <AudioPlayer />
    </div>)
}

export default Recorder;