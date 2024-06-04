import { create } from 'zustand';

interface IRecordingStore {
  isRecording: boolean;
  isPaused: boolean;
  transcribedText: string;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  setTranscribedText: (text: string) => void;
}

const useRecordingStore = create<IRecordingStore>((set) => ({
  isRecording: false,
  isPaused: false,
  transcribedText: '',
  startRecording: () => set({ isRecording: true, isPaused: false }),
  pauseRecording: () => set({ isPaused: true }),
  resumeRecording: () => set({ isPaused: false }),
  stopRecording: () => set({ isRecording: false, isPaused: false }),
  setTranscribedText: (text: string) => set({ transcribedText: text }),
}));

export default useRecordingStore;