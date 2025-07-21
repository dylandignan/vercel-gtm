import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    console.log("Sales assistant API hit!")

    const { messages } = await request.json()
    console.log("Received messages:", messages.length)

    const result = await streamText({
      model: openai("gpt-4o"),
      messages,
      system:
        "You are a helpful Vercel sales assistant. I can help with general questions about Vercel and sales processes.",
    })

    console.log("Returning streaming response")
    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error("Sales assistant API error:", error)

    // Return a proper error response that won't break useChat
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
