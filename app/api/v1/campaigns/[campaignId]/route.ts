import { NextResponse } from "next/server";
import { campaignMetrics, mockCampaigns } from "@/constants/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  const { campaignId } = await params;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);

  if (!campaign) {
    return NextResponse.json(
      { message: "Campaign not found", status: 404 },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...campaign, metrics: campaignMetrics });
}
