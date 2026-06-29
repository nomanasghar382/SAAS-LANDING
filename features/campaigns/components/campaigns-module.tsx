"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignAnalytics } from "./campaign-analytics";
import { CampaignCard } from "./campaign-card";
import { CampaignStats } from "./campaign-stats";
import { campaignMetrics, mockCampaigns } from "@/constants/mock-data";

export function CampaignsModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <CampaignStats campaigns={mockCampaigns} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <CampaignAnalytics data={campaignMetrics} />
    </div>
  );
}
