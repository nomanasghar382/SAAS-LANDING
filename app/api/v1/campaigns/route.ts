import { NextResponse } from "next/server";
import { getCampaigns } from "@/lib/data/campaigns.repository";

export async function GET() {
  return NextResponse.json(getCampaigns());
}
