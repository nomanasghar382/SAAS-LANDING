import { mockCampaigns } from "@/constants/mock-data";
import type { Campaign, PaginatedResponse } from "@/types";

export function getCampaigns(): PaginatedResponse<Campaign> {
  return {
    data: mockCampaigns,
    total: mockCampaigns.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export function getCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find((campaign) => campaign.id === id);
}
