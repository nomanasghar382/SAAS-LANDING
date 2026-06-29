import { NextResponse } from "next/server";
import { z } from "zod";
import { createCampaign, getCampaigns } from "@/lib/data/campaigns.repository";

const createCampaignSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  status: z.enum(["draft", "active", "paused", "completed"]).optional(),
});

export async function GET() {
  return NextResponse.json(getCampaigns());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createCampaignSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid campaign data", status: 400 },
        { status: 400 }
      );
    }

    const campaign = createCampaign(parsed.data);
    return NextResponse.json(campaign, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create campaign", status: 500 },
      { status: 500 }
    );
  }
}
