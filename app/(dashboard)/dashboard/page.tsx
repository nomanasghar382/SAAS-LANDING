import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { activityFeed, dashboardStats, revenueData } from "@/constants/mock-data";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Overview of your sales performance"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <ActivityFeed activities={activityFeed} />
      </div>
    </DashboardLayout>
  );
}
