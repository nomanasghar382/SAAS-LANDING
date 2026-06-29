import { NextResponse } from "next/server";
import { getLeads } from "@/lib/data/leads.repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = getLeads({
    status: searchParams.get("status"),
    source: searchParams.get("source"),
    search: searchParams.get("search"),
  });

  return NextResponse.json(response);
}
