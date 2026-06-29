import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead, getLeads } from "@/lib/data/leads.repository";

const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  status: z
    .enum(["new", "contacted", "qualified", "proposal", "won", "lost"])
    .optional(),
  source: z
    .enum(["website", "referral", "linkedin", "cold_outreach", "event"])
    .optional(),
  value: z.number().min(0).optional(),
  score: z.number().min(0).max(100).optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = getLeads({
    status: searchParams.get("status"),
    source: searchParams.get("source"),
    search: searchParams.get("search"),
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid lead data", status: 400 },
        { status: 400 }
      );
    }

    const lead = createLead(parsed.data);
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create lead", status: 500 },
      { status: 500 }
    );
  }
}
