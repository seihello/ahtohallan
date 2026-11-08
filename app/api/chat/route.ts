import { streamText } from "ai";
import { claude } from "@/lib/ai/claude";

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const result = streamText({
    model: claude,
    messages,
    maxTokens: 16000,
  });

  return result.toDataStreamResponse();
}
