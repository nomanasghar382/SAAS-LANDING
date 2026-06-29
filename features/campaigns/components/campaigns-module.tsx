"use client";

import { useEffect, useState } from "react";
import { Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { PageLoading } from "@/components/shared/page-loading";
import { CampaignAnalytics } from "./campaign-analytics";
import { CampaignCard } from "./campaign-card";
import { CampaignStats } from "./campaign-stats";
import { campaignMetrics } from "@/constants/mock-data";
import { campaignsService } from "@/services/campaigns.service";
import { toast } from "@/lib/toast";
import type { Campaign } from "@/types";

export function CampaignsModule() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    campaignsService
      .getAll()
      .then((res) => setCampaigns(res.data))
      .catch(() => {
        toast.error("Failed to load campaigns");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleNewCampaign = () => {
    toast.info("New campaign", "Campaign builder will open in the next release.");
  };

  if (isLoading) {
    return <PageLoading label="Loading campaigns" className="min-h-[50vh]" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button size="sm" onClick={handleNewCampaign}>
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <CampaignStats campaigns={campaigns} />

      {campaigns.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No campaigns yet"
          description="Create your first campaign to start reaching leads with AI-powered outreach."
          action={{ label: "Create campaign", onClick: handleNewCampaign }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}

      <CampaignAnalytics data={campaignMetrics} />
    </div>
  );
}
