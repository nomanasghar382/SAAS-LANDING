import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { dashboardStats, revenueData } from "@/constants/mock-data";

export const metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics"
      description="Deep insights into your sales performance"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
      <div className="mt-6">
        <RevenueChart data={revenueData} title="Revenue Trends" />
      </div>
    </DashboardLayout>
  );
}
