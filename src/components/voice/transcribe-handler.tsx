import useLoadingDots from "@/hooks/useLoadingDots";
import useTranscribeStore, { TranscribeStatus } from "@/store/transcribe-store";

const TranscribeHandler = () => {
  const { transcribeStatus, transcribedText } = useTranscribeStore();
  const loadingDots = useLoadingDots();

  if (transcribeStatus === TranscribeStatus.NotTranscribing) {
    return null;
  }

  const renderContent = {
    [TranscribeStatus.Loading]: <p>Transcribing audio{loadingDots}</p>,
    [TranscribeStatus.Finished]: <p>{transcribedText || "No transcription available"}</p>,
  }
  
  return (
    <section>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-full">
        <h3 className="text-lg font-medium mb-2">Transcription</h3>
        <div className="text-gray-500 dark:text-gray-400 h-32 overflow-auto">
          {renderContent[transcribeStatus]}
        </div>
      </div>
    </section>
  )
}

export default TranscribeHandler