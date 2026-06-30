import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/common/SearchBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import type { Order, OrderStatus } from "@/types";
import { formatINR, formatTime } from "@/utils/format";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  data: Order[];
  pageSize?: number;
  initialStatus?: OrderStatus | "All";
}

export function OrdersTable({ data, pageSize = 8, initialStatus = "All" }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "All">(initialStatus);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return data.filter((o) => {
      if (status !== "All" && o.status !== status) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.userName.toLowerCase().includes(q) ||
        o.admissionNumber.toLowerCase().includes(q) ||
        o.items.some((it) => it.name.toLowerCase().includes(q))
      );
    });
  }, [data, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by order, name, item..."
        />
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v as OrderStatus | "All");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            <SelectItem value="Take Order">Take Order</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Admission</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="p-0">
                    <EmptyState title="No orders found" description="Try adjusting your filters or search query." />
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((o) => (
                  <TableRow key={o.id} className="cursor-pointer" onClick={() => setSelected(o)}>
                    <TableCell className="font-medium text-foreground">{o.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{o.userName}</div>
                      <div className="text-xs text-muted-foreground">{o.role}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{o.admissionNumber}</TableCell>
                    <TableCell className="max-w-[220px] truncate text-muted-foreground">
                      {o.items.map((it) => it.name).join(", ")}
                    </TableCell>
                    <TableCell className="text-center">{o.totalQuantity}</TableCell>
                    <TableCell className="text-right font-medium">{formatINR(o.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-md border font-medium",
                          o.paymentMethod === "UPI"
                            ? "border-chart-2/20 bg-chart-2/10 text-chart-2"
                            : "border-warning/20 bg-warning/10 text-warning",
                        )}
                      >
                        {o.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatTime(o.orderTime)}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(current - 1) * pageSize + 1}–
            {Math.min(current * pageSize, filtered.length)} of {filtered.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={current === totalPages}>
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <OrderDetailsModal order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
