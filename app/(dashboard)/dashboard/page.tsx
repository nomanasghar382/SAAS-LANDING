import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { RevenueChartLazy } from "@/features/dashboard/components/revenue-chart-lazy";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { getDashboardOverview } from "@/lib/data/dashboard.repository";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata = dashboardMetadata(
  "Dashboard",
  "Overview of your sales performance"
);

export default function DashboardPage() {
  const { stats, revenue, activity } = getDashboardOverview();

  return (
    <DashboardLayout
      title="Dashboard"
      description="Overview of your sales performance"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChartLazy data={revenue} />
        </div>
        <ActivityFeed activities={activity} />
      </div>
    </DashboardLayout>
  );
}
