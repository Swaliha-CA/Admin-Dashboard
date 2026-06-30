import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FeedbackAlertProps {
  variant: "error" | "success";
  title: string;
  description?: string;
  className?: string;
}

export function FeedbackAlert({ variant, title, description, className }: FeedbackAlertProps) {
  const isError = variant === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <Alert
      role={isError ? "alert" : "status"}
      className={cn(
        "border",
        isError
          ? "border-destructive/40 bg-destructive/10 text-destructive [&>svg]:text-destructive"
          : "border-primary/40 bg-primary/10 text-primary [&>svg]:text-primary",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle className="font-medium">{title}</AlertTitle>
      {description ? <AlertDescription className="text-sm opacity-90">{description}</AlertDescription> : null}
    </Alert>
  );
}
