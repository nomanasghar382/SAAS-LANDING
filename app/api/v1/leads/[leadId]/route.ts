import { NextResponse } from "next/server";
import { getLeadById } from "@/lib/data/leads.repository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await params;
  const lead = getLeadById(leadId);

  if (!lead) {
    return NextResponse.json(
      { message: "Lead not found", status: 404 },
      { status: 404 }
    );
  }

  return NextResponse.json(lead);
}
