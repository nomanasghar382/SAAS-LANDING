import { NextResponse } from "next/server";
import { mockLeads } from "@/constants/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await params;
  const lead = mockLeads.find((l) => l.id === leadId);

  if (!lead) {
    return NextResponse.json(
      { message: "Lead not found", status: 404 },
      { status: 404 }
    );
  }

  return NextResponse.json(lead);
}
