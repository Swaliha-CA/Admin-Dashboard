import { PageHeader } from "@/components/common/PageHeader";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { orders } from "@/data/orders";

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Monitor every order across the canteen in real time." />
      <OrdersTable data={orders} pageSize={10} />
    </div>
  );
}
