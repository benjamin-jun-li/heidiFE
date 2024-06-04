import { create } from "zustand";

export enum TranscribeStatus {
  NotTranscribing = "NotTranscribing",
  Loading = "Loading",
  Finished = "Finished",
}

interface ITranscribeStore {
  transcribeStatus: TranscribeStatus;
  onTranscribeStatusChange: (status: TranscribeStatus) => void;
  transcribedText: string;
  setTranscribedText: (text: string) => void;
}

const useTranscribeStore = create<ITranscribeStore>((set) => ({
  transcribeStatus: TranscribeStatus.NotTranscribing,
  onTranscribeStatusChange: (status: TranscribeStatus) =>
    set({ transcribeStatus: status }),
  transcribedText: "",
  setTranscribedText: (text: string) => set({ transcribedText: text }),
}));

export default useTranscribeStore;
