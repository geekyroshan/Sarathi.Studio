import { NextRequest } from "next/server"
import OpenAI from "openai"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { messages } = body as { messages: Array<{ role: string; content: string }> }

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 })
  }
  if (!process.env.OPENAI_ASSISTANT_ID) {
    return new Response("Missing OPENAI_ASSISTANT_ID", { status: 500 })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  // Build conversation history (map our roles) and keep the most recent turns to reduce latency
  const history: Array<{ role: "assistant" | "user"; content: string }> = (messages || []).map((m) => ({
    role: m.role === "bot" ? "assistant" : "user",
    content: m.content,
  })).slice(-6)

  // Create thread with messages in a single request to reduce round-trips
  const thread = await client.beta.threads.create({ messages: history })

  // Run the assistant on that thread (retrieval configured on assistant)
  const run = await client.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID,
    additional_instructions:
      "Only answer using the attached files. If unsure, ask a brief follow-up or say you don’t have that info.",
  })

  if (run.status !== "completed") {
    return new Response(`Assistant run not completed: ${run.status}`, { status: 500 })
  }

  // Read the latest assistant message
  const list = await client.beta.threads.messages.list(thread.id, { limit: 10 })
  const lastAssistant = list.data.find((m) => m.role === "assistant") as any
  const text = lastAssistant?.content?.map((c: any) => (c.type === "text" ? c.text.value : "")).join("\n").trim() || ""

  return Response.json({ reply: text })
}


