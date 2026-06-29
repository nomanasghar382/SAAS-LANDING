"use client";

import { CommandPalette } from "@/components/command/command-palette";
import { AddLeadModal } from "@/features/leads/components/add-lead-modal";
import { CreateCampaignModal } from "@/features/campaigns/components/create-campaign-modal";

export function DashboardProviders() {
  return (
    <>
      <CommandPalette />
      <AddLeadModal />
      <CreateCampaignModal />
    </>
  );
}
