import { apiClient } from "@/lib/api/client";
import type { ActivityItem, DashboardStat, RevenueDataPoint } from "@/types";

interface DashboardData {
  stats: DashboardStat[];
  revenue: RevenueDataPoint[];
  activity: ActivityItem[];
}

export const dashboardService = {
  getOverview: () => apiClient<DashboardData>("/api/v1/dashboard"),
};
