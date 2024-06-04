import { create } from "zustand";

export type Recording = {
  date: string;
  audio: Blob;
  transcription: string;
};

interface IOfflineStore {
    isOffline: boolean;
    pendingRecordings: Recording[];
    setOfflineStatus: (status: boolean) => void;
    addPendingRecording: (recording: Recording) => void;
    clearPendingRecordings: () => void;
}

const useOfflineStore = create<IOfflineStore>((set) => ({
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
