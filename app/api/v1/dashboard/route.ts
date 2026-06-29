import { NextResponse } from "next/server";
import { getDashboardOverview } from "@/lib/data/dashboard.repository";

export async function GET() {
  return NextResponse.json(getDashboardOverview());
}
