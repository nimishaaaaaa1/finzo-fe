// 
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Add type for conversation messages
type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT: ChatMessage = {
  role: "system",
  content: `You are Finzo, a fun and knowledgeable AI assistant for Indian taxation and finance, built with Next.js. Keep responses concise and engaging.

Key Capabilities:
- Income Tax (Old vs New regime, calculations, filing)
- GST guidance and calculations
- Financial literacy (budgeting, saving)
- Investment advice (FDs, PPF, Mutual Funds)

Style Guide:
- Keep responses under 50 words when possible
- Use emojis sparingly (max 2 per response)
- Format using markdown for readability
- Be friendly but direct
- Never add generic closing messages
- Don't mention being an AI or suggest consulting experts

Tax Knowledge:
- Current tax slabs (FY 2024-25)
- GST rates (5%, 12%, 18%, 28%)
- Section 80C/80D deductions`
}

// Use the type for conversation history
let conversationHistory: ChatMessage[] = []

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json()
    
    conversationHistory = [
      SYSTEM_PROMPT,
      ...conversationHistory.slice(-10),
      ...messages.slice(-2)
    ]

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0].message

    // Add assistant's response to history
    conversationHistory.push({
      role: assistantMessage.role,
      content: assistantMessage.content || ''  // Provide empty string as fallback
    })

    return NextResponse.json({
      result: assistantMessage
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}

