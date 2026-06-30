import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Order } from "@/types";
import { formatINR, formatDateTime } from "@/utils/format";

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        {order ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {order.id}
                <StatusBadge status={order.status} />
              </DialogTitle>
              <DialogDescription>
                Placed {formatDateTime(order.orderTime)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Customer</div>
                <div className="mt-1 font-medium">{order.userName}</div>
                <div className="text-xs text-muted-foreground">{order.role}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Admission</div>
                <div className="mt-1 font-medium">{order.admissionNumber}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Payment</div>
                <div className="mt-1 font-medium">{order.paymentMethod}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Qty</div>
                <div className="mt-1 font-medium">{order.totalQuantity}</div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Items
              </div>
              <div className="space-y-2">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatINR(it.price)} × {it.quantity}
                      </div>
                    </div>
                    <div className="font-medium">{formatINR(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-lg font-semibold">{formatINR(order.amount)}</div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
