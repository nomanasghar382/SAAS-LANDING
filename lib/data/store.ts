import { mockCampaigns, mockLeads } from "@/constants/mock-data";
import type { Campaign, Lead } from "@/types";

let leadsStore: Lead[] | null = null;
let campaignsStore: Campaign[] | null = null;

export function getLeadsStore(): Lead[] {
  if (!leadsStore) leadsStore = structuredClone(mockLeads);
  return leadsStore;
}

export function getCampaignsStore(): Campaign[] {
  if (!campaignsStore) campaignsStore = structuredClone(mockCampaigns);
  return campaignsStore;
}

export function resetStores() {
  leadsStore = null;
  campaignsStore = null;
}
