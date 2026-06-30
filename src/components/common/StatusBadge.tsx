import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const map: Record<OrderStatus, string> = {
  "Take Order": "bg-warning/15 text-warning border-warning/20",
  Completed: "bg-success/15 text-success border-success/20",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-md border font-medium", map[status])}>
      {status}
    </Badge>
  );
}
