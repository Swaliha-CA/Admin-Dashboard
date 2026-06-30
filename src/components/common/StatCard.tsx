import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  hint?: string;
  accent?: "primary" | "blue" | "amber" | "violet";
}

const accents: Record<NonNullable<StatCardProps["accent"]>, string> = {
  primary: "bg-primary/10 text-primary",
  blue: "bg-chart-2/15 text-chart-2",
  amber: "bg-warning/15 text-warning",
  violet: "bg-chart-5/15 text-chart-5",
};

export function StatCard({ label, value, icon: Icon, trend, hint, accent = "primary" }: StatCardProps) {
  const positive = (trend ?? 0) >= 0;
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-2 truncate text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </div>
            {trend !== undefined ? (
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                    positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
                  )}
                >
                  {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(trend)}%
                </span>
                <span className="text-muted-foreground">vs yesterday</span>
              </div>
            ) : hint ? (
              <div className="mt-2 text-xs text-muted-foreground">{hint}</div>
            ) : null}
          </div>
          <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", accents[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
