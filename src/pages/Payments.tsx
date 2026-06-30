import { Banknote, Smartphone, Receipt } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { PaymentTable } from "@/components/payments/PaymentTable";
import { payments } from "@/data/payments";
import { formatINR } from "@/utils/format";

export function PaymentsPage() {
  const cash = payments.filter((p) => p.method === "Cash").reduce((s, p) => s + p.amount, 0);
  const upi = payments.filter((p) => p.method === "UPI").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="A breakdown of cash and UPI transactions." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Cash Revenue" value={formatINR(cash)} icon={Banknote} accent="amber" />
        <StatCard label="Total UPI Revenue" value={formatINR(upi)} icon={Smartphone} accent="blue" />
        <StatCard label="Total Transactions" value={payments.length.toString()} icon={Receipt} accent="primary" />
      </div>

      <PaymentTable data={payments} />
    </div>
  );
}
