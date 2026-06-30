import type { Payment } from "@/types";
import { orders } from "./orders";

export const payments: Payment[] = orders.map((o) => ({
  id: `PAY-${o.id.split("-")[1]}`,
  orderId: o.id,
  user: o.userName,
  amount: o.amount,
  method: o.paymentMethod,
  time: o.orderTime,
}));
