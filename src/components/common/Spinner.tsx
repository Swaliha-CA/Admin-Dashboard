import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
};

export function Spinner({ label, className, size = "md" }: SpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)} role="status" aria-live="polite">
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
}
