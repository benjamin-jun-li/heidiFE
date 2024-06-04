import { create } from 'zustand';

export enum RecordingStatus {
  NotRecording = 'NotRecording',
  Recording = 'Recording',
  Paused = 'Paused',
  Finished = 'Finished',
}

interface IRecordingStore {
  recordingStatus: RecordingStatus;
  onRecordingStatusChange: (status: RecordingStatus) => void;
  audio: Blob | null;
  setAudio: (audio: Blob) => void;
}

const useRecordingStore = create<IRecordingStore>((set) => ({
  recordingStatus: RecordingStatus.NotRecording,
  onRecordingStatusChange: (status: RecordingStatus) => set({ recordingStatus: status }),
  audio: null,
  setAudio: (audio: Blob) => set({ audio }),
}));

export default useRecordingStore;