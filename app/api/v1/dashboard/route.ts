import { NextResponse } from "next/server";
import {
  activityFeed,
  dashboardStats,
  revenueData,
} from "@/constants/mock-data";

export async function GET() {
  return NextResponse.json({
    stats: dashboardStats,
    revenue: revenueData,
    activity: activityFeed,
  });
}
