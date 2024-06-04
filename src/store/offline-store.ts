import { create } from "zustand";

export type Recording = {
  date: string;
  audio: Blob;
  transcription: string;
};

const useOfflineStore = create((set) => ({
  isOffline: navigator.onLine === false,
  pendingRecordings: [],
  setOfflineStatus: (status: boolean) => set({ isOffline: status }),
  addPendingRecording: (recording: Recording) =>
    set((state: { pendingRecordings: Recording[] }) => ({
      pendingRecordings: [...state.pendingRecordings, recording],
    })),
  clearPendingRecordings: () => set({ pendingRecordings: [] }),
}));

export default useOfflineStore;
