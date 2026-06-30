import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatINR, formatTime } from "@/utils/format";
import type { Payment } from "@/types";
import { cn } from "@/lib/utils";

interface PaymentTableProps {
  data: Payment[];
}

export function PaymentTable({ data }: PaymentTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.orderId}</TableCell>
                <TableCell>{p.user}</TableCell>
                <TableCell className="text-right font-medium">{formatINR(p.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-md border font-medium",
                      p.method === "UPI"
                        ? "border-chart-2/20 bg-chart-2/10 text-chart-2"
                        : "border-warning/20 bg-warning/10 text-warning",
                    )}
                  >
                    {p.method}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatTime(p.time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
