import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", status: 400 },
        { status: 400 }
      );
    }

    // In production: send to CRM, email service, or queue
    return NextResponse.json({
      message: "Message received successfully",
      data: { receivedAt: new Date().toISOString() },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to process request", status: 500 },
      { status: 500 }
    );
  }
}
