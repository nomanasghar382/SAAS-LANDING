import { getCampaignsStore } from "@/lib/data/store";
import type { Campaign, CampaignStatus, PaginatedResponse } from "@/types";

export interface CreateCampaignInput {
  name: string;
  description: string;
  status?: CampaignStatus;
}

export function getCampaigns(): PaginatedResponse<Campaign> {
  const data = getCampaignsStore();
  return {
    data,
    total: data.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export function getCampaignById(id: string): Campaign | undefined {
  return getCampaignsStore().find((campaign) => campaign.id === id);
}

export function createCampaign(input: CreateCampaignInput): Campaign {
  const campaign: Campaign = {
    id: `camp-${crypto.randomUUID().slice(0, 8)}`,
    name: input.name,
    description: input.description,
    status: input.status ?? "draft",
    leads: 0,
    conversions: 0,
    revenue: 0,
    openRate: 0,
    emailsSent: 0,
    startDate: new Date().toISOString(),
  };

  getCampaignsStore().unshift(campaign);
  return campaign;
}
