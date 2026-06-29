import { NextResponse } from "next/server";
import { mockLeads } from "@/constants/mock-data";
import type { Lead, PaginatedResponse } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const search = searchParams.get("search");

  let filtered = [...mockLeads];

  if (status && status !== "all") {
    filtered = filtered.filter((lead) => lead.status === status);
  }
  if (source && source !== "all") {
    filtered = filtered.filter((lead) => lead.source === source);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
    );
  }

  const response: PaginatedResponse<Lead> = {
    data: filtered,
    total: filtered.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };

  return NextResponse.json(response);
}
