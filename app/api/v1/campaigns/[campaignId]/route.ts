import { NextResponse } from "next/server";
import { getCampaignById } from "@/lib/data/campaigns.repository";
import { getCampaignMetrics } from "@/lib/data/dashboard.repository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  const { campaignId } = await params;
  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    return NextResponse.json(
      { message: "Campaign not found", status: 404 },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...campaign, metrics: getCampaignMetrics() });
}
