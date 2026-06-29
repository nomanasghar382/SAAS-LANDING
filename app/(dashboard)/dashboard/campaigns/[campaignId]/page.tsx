import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampaignAnalytics } from "@/features/campaigns/components/campaign-analytics";
import { campaignMetrics, mockCampaigns } from "@/constants/mock-data";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/utils/format";

interface CampaignDetailPageProps {
  params: Promise<{ campaignId: string }>;
}

export async function generateMetadata({ params }: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);
  return {
    title: campaign ? `${campaign.name} — Campaign` : "Campaign Not Found",
  };
}

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);

  if (!campaign) notFound();

  const conversionRate =
    campaign.leads > 0
      ? ((campaign.conversions / campaign.leads) * 100).toFixed(1)
      : "0";

  return (
    <DashboardLayout
      title={campaign.name}
      description={campaign.description}
    >
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href={ROUTES.campaigns}>
          <ArrowLeft className="h-4 w-4" />
          Back to campaigns
        </Link>
      </Button>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="success">{campaign.status}</Badge>
        <span className="text-sm text-muted-foreground">
          Started {formatDate(campaign.startDate)}
        </span>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Leads", value: campaign.leads.toString() },
          { label: "Conversions", value: campaign.conversions.toString() },
          { label: "Open Rate", value: `${campaign.openRate}%` },
          { label: "Conv. Rate", value: `${conversionRate}%` },
          { label: "Revenue", value: formatCurrency(campaign.revenue) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <CampaignAnalytics data={campaignMetrics} />
    </DashboardLayout>
  );
}
