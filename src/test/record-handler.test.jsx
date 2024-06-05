/* eslint-disable no-undef */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import useRecordingStore, { RecordingStatus } from '@/store/recording-store';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import useSpeechRecognition from '@/hooks/useWebSpeech';
import { toast } from 'sonner';
import RecordHandler from '@/components/voice/record-handler';

vi.mock('@/store/recording-store');
vi.mock('@/hooks/useAudioRecorder');
vi.mock('@/hooks/useWebSpeech');
vi.mock('sonner');

describe('RecordHandler', () => {
  beforeEach(() => {
    if (!global.navigator.mediaDevices) {
      global.navigator.mediaDevices = {};
    }
    global.navigator.mediaDevices.getUserMedia = vi.fn().mockResolvedValue({});
    
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.NotRecording,
    });
    useAudioRecorder.mockReturnValue({
      startRecording: vi.fn(),
      pauseRecording: vi.fn(),
      stopRecording: vi.fn(),
      resumeRecording: vi.fn(),
    });
    useSpeechRecognition.mockReturnValue({
      startRecognition: vi.fn(),
      stopRecognition: vi.fn(),
      pauseRecognition: vi.fn(),
      resumeRecognition: vi.fn(),
    });
    toast.error = vi.fn();
  });

  it('renders the component correctly', () => {
    render(<RecordHandler />);
    expect(screen.getByText('Audio Recorder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start-recording/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause-recording/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stop-recording/i })).toBeInTheDocument();
  });

  it('starts recording when the start button is clicked', async () => {
    global.navigator.mediaDevices.getUserMedia = vi.fn().mockResolvedValue({});
    render(<RecordHandler />);
    const startButton = screen.getByRole('button', { name: /start-recording/i });
    await fireEvent.click(startButton);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(useAudioRecorder().startRecording).toHaveBeenCalled();
    expect(useSpeechRecognition().startRecognition).toHaveBeenCalled();
  });

  it('displays an error toast when microphone permission is denied', async () => {
    global.navigator.mediaDevices.getUserMedia = vi.fn().mockRejectedValue(new Error());
    render(<RecordHandler />);
    const startButton = screen.getByRole('button', { name: /start-recording/i });
    await fireEvent.click(startButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    
    expect(toast.error).toHaveBeenCalledWith('Microphone permission is required to record audio');
  });

  it('pauses recording when the pause button is clicked', async () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Recording,
    });
    render(<RecordHandler />);
    const pauseButton = screen.getByRole('button', { name: /pause-recording/i });
    await fireEvent.click(pauseButton);
    expect(useAudioRecorder().pauseRecording).toHaveBeenCalled();
    expect(useSpeechRecognition().pauseRecognition).toHaveBeenCalled();
  });

  it('resumes recording when the resume button is clicked', async () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Paused,
    });
    render(<RecordHandler />);
    const resumeButton = screen.getByRole('button', { name: /pause-recording/i });
    await fireEvent.click(resumeButton);
    expect(useAudioRecorder().resumeRecording).toHaveBeenCalled();
    expect(useSpeechRecognition().resumeRecognition).toHaveBeenCalled();
  });

  it('stops recording when the stop button is clicked', async () => {
    useRecordingStore.mockReturnValue({
      recordingStatus: RecordingStatus.Recording,
    });
    render(<RecordHandler />);
    const stopButton = screen.getByRole('button', { name: /stop-recording/i });
    await fireEvent.click(stopButton);
    expect(useAudioRecorder().stopRecording).toHaveBeenCalled();
    expect(useSpeechRecognition().stopRecognition).toHaveBeenCalled();
  });
});