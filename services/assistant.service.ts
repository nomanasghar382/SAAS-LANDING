export async function streamAssistantResponse(
  message: string,
  onChunk: (content: string) => void
): Promise<void> {
  const response = await fetch("/api/v1/assistant/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  if (!response.ok || !response.body) {
    throw new Error("Assistant request failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6);
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data) as { content: string };
        onChunk(parsed.content);
      } catch {
        // skip malformed chunks
      }
    }
  }
}
