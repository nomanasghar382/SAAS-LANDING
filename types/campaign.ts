export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  leads: number;
  conversions: number;
  revenue: number;
  startDate: string;
  endDate?: string;
}

export interface CampaignMetric {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}
