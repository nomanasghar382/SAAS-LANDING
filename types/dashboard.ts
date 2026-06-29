export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export interface ActivityItem {
  id: string;
  type: "lead" | "campaign" | "customer" | "automation";
  title: string;
  description: string;
  timestamp: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
}
