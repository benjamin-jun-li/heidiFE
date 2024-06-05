import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import useRecordingStore, { RecordingStatus } from '@/store/recording-store';
import useOffline from '@/hooks/useOffline';
import VoiceHandler from '@/components/voice/voice-handler';

vi.mock('@/store/recording-store');
vi.mock('@/hooks/useOffline');

describe('VoiceHandler', () => {
  beforeEach(() => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.NotRecording,
    });
    useOffline.mockReturnValue(false);
  });

  it('renders the initial content when not recording', () => {
    render(<VoiceHandler />);

    expect(screen.getByText(/Your recorded audio will be transcribed/i)).toBeInTheDocument();
    expect(screen.getByText(/You need to allow microphone access/i)).toBeInTheDocument();
  });

  it('renders the paused content when recording is paused', () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Paused,
    });

    render(<VoiceHandler />);

    expect(screen.getByText(/Recording paused/i)).toBeInTheDocument();
  });

  it('renders the recording content when recording is in progress', () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Recording,
    });

    render(<VoiceHandler />);

    expect(screen.getByText(/Recording in progress/i)).toBeInTheDocument();
  });

  it('renders the audio player and transcribe handler when recording is finished and online', () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Finished,
    });

    render(<VoiceHandler />);

    expect(screen.getByText('Audio Playback')).toBeInTheDocument();
    expect(screen.getByText('No transcription available')).toBeInTheDocument();
  });

  it('renders the offline message when recording is finished and offline', () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Finished,
    });
    useOffline.mockReturnValue(true);

    render(<VoiceHandler />);

    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();
  });
});