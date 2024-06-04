import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
}

const Hint = ({
  children,
  label,
  side,
  align,
  alignOffset,
  sideOffset,
}: HintProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className="text-white bg-slate-900 border-slate-900"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <p className="font-semibold capitalize">{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
  
export default Hint;