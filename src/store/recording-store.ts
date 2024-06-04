import { create } from 'zustand';

const useRecordingStore = create((set) => ({
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