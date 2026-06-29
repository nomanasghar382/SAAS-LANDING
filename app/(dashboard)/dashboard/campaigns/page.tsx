import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CampaignAnalytics } from "@/features/campaigns/components/campaign-analytics";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { campaignMetrics, mockCampaigns } from "@/constants/mock-data";

export const metadata = {
  title: "Campaigns",
};

export default function CampaignsPage() {
  return (
    <DashboardLayout
      title="Campaigns"
      description="Create and manage your sales campaigns"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <CampaignAnalytics data={campaignMetrics} />
      </div>
    </DashboardLayout>
  );
}
