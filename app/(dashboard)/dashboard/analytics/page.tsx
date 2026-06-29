import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { RevenueChartLazy } from "@/features/dashboard/components/revenue-chart-lazy";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { getDashboardOverview } from "@/lib/data/dashboard.repository";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata = dashboardMetadata(
  "Analytics",
  "Deep insights into your sales performance"
);

export default function AnalyticsPage() {
  const { stats, revenue } = getDashboardOverview();

  return (
    <DashboardLayout
      title="Analytics"
      description="Deep insights into your sales performance"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
      <div className="mt-6">
        <RevenueChartLazy data={revenue} title="Revenue Trends" />
      </div>
    </DashboardLayout>
  );
}
