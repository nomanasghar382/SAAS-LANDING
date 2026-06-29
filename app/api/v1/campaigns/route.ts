import { NextResponse } from "next/server";
import { mockCampaigns } from "@/constants/mock-data";
import type { Campaign, PaginatedResponse } from "@/types";

export async function GET() {
  const response: PaginatedResponse<Campaign> = {
    data: mockCampaigns,
    total: mockCampaigns.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };

  return NextResponse.json(response);
}
