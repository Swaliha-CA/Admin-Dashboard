import { IndianRupee, CalendarDays, CalendarRange } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { AnalyticsChart } from "@/components/analytics/AnalyticsChart";
import { dailyRevenue, weeklyRevenue, monthlyRevenue } from "@/data/revenue";
import { formatINR } from "@/utils/format";

export function RevenueAnalyticsPage() {
  const today = dailyRevenue.reduce((s, p) => s + p.revenue, 0);
  const week = weeklyRevenue.reduce((s, p) => s + p.revenue, 0);
  const month = monthlyRevenue.reduce((s, p) => s + p.revenue, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Analytics"
        description="Understand earnings patterns across days, weeks, and months."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Today's Revenue" value={formatINR(today)} icon={IndianRupee} trend={9} accent="primary" />
        <StatCard label="Weekly Revenue" value={formatINR(week)} icon={CalendarDays} trend={6} accent="blue" />
        <StatCard label="Monthly Revenue" value={formatINR(month)} icon={CalendarRange} trend={14} accent="violet" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnalyticsChart
          title="Daily Revenue Trend"
          description="Hourly breakdown of today's earnings"
          data={dailyRevenue}
          type="line"
        />
        <AnalyticsChart
          title="Weekly Revenue Trend"
          description="Total earnings per day this week"
          data={weeklyRevenue}
          type="bar"
        />
      </div>

      <AnalyticsChart
        title="Monthly Performance"
        description="Daily revenue across the last 30 days"
        data={monthlyRevenue}
        type="line"
      />
    </div>
  );
}
