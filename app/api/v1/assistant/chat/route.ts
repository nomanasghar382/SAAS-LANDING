import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAssistantResponse } from "@/lib/assistant/brain";

const chatSchema = z.object({
  message: z.string().min(1).max(4000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid message" }, { status: 400 });
    }

    const response = generateAssistantResponse(parsed.data.message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < response.length; i++) {
          const chunk = response.slice(0, i + 1);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
          );
          await new Promise((r) => setTimeout(r, 12));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Assistant unavailable" },
      { status: 500 }
    );
  }
}
