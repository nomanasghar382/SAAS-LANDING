import { getIntegrations } from "@/lib/data/integrations.repository";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: getIntegrations() });
}
