import { CircleStop, Mic, Pause, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecordHandler = () => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">Audio Recorder</h2>
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Mic className="h-6 w-6" />
        <span className="sr-only">Start Recording</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Pause className="h-6 w-6" />
        <span className="sr-only">Pause Recording</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <CircleStop className="h-6 w-6"/>
        <span className="sr-only">Stop Recording</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ScanText className="h-6 w-6"/>
        <span className="sr-only">Convert to Text</span>
      </Button>
    </div>
  </div>
)

export default RecordHandler;