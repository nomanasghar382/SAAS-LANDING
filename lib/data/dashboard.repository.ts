import {
  activityFeed,
  campaignMetrics,
  dashboardStats,
  revenueData,
} from "@/constants/mock-data";

export function getDashboardOverview() {
  return {
    stats: dashboardStats,
    revenue: revenueData,
    activity: activityFeed,
  };
}

export function getCampaignMetrics() {
  return campaignMetrics;
}
