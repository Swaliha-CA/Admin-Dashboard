import { useMemo } from "react";
import {
  ShoppingBag,
  IndianRupee,
  Flame,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { orders } from "@/data/orders";
import { formatINR } from "@/utils/format";
import { useAuth } from "@/auth/useAuth";

function isSameDay(iso: string, day: Date) {
  const d = new Date(iso);
  return (
    d.getFullYear() === day.getFullYear() &&
    d.getMonth() === day.getMonth() &&
    d.getDate() === day.getDate()
  );
}

export function DashboardPage() {
  const { user } = useAuth();

  const stats = useMemo(() => {
    const today = new Date(orders[0]?.orderTime ?? Date.now());
    const totalOrders = orders.length;
    const cashRevenue = orders
      .filter((o) => o.paymentMethod === "Cash")
      .reduce((s, o) => s + o.amount, 0);
    const upiRevenue = orders
      .filter((o) => o.paymentMethod === "UPI")
      .reduce((s, o) => s + o.amount, 0);
    const completed = orders.filter((o) => o.status === "Completed").length;

    const todaysItemCounts = new Map<string, number>();
    for (const o of orders) {
      if (!isSameDay(o.orderTime, today)) continue;
      for (const it of o.items) {
        todaysItemCounts.set(it.name, (todaysItemCounts.get(it.name) ?? 0) + it.quantity);
      }
    }
    const topItems = [...todaysItemCounts.entries()]
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    return { totalOrders, cashRevenue, upiRevenue, completed, topItems };
  }, []);

  // Static user breakdown (placeholder counts — wire to auth backend when available).
  const users = { students: 450, faculty: 82 };
  const totalUsers = users.students + users.faculty;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "Admin"}`}
        description="Here's a quick look at what's happening at your canteen today."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Total Orders */}
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {stats.totalOrders}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">All time</div>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue split */}
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">Total Revenue</div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-warning/10 px-3 py-2">
                    <div className="text-[11px] font-medium uppercase tracking-wide text-warning">Cash</div>
                    <div className="mt-1 truncate text-lg font-semibold text-foreground">
                      {formatINR(stats.cashRevenue)}
                    </div>
                  </div>
                  <div className="rounded-xl bg-chart-2/10 px-3 py-2">
                    <div className="text-[11px] font-medium uppercase tracking-wide text-chart-2">UPI</div>
                    <div className="mt-1 truncate text-lg font-semibold text-foreground">
                      {formatINR(stats.upiRevenue)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-chart-2/15 text-chart-2">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Orders */}
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-muted-foreground">Completed Orders</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {stats.completed}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Fulfilled so far</div>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's most-selling items */}
        <Card className="border-border md:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">Today's Most Selling Items</div>
                <ul className="mt-3 divide-y divide-border">
                  {stats.topItems.length === 0 ? (
                    <li className="py-3 text-sm text-muted-foreground">No orders yet today.</li>
                  ) : (
                    stats.topItems.map((it, idx) => (
                      <li key={it.name} className="flex items-center justify-between py-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                            {idx + 1}
                          </span>
                          <span className="truncate text-sm font-medium text-foreground">{it.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{it.qty} Orders</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
                <Flame className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-semibold text-foreground">{users.students}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Faculty</span>
                    <span className="font-semibold text-foreground">{users.faculty}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2 text-sm">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="text-lg font-semibold text-primary">{totalUsers}</span>
                  </div>
                </div>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-chart-5/15 text-chart-5">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
