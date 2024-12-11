import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key. Please add OPENAI_API_KEY to your environment variables.')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",  // Using the latest stable model
      messages: [
        {
          role: "system",
          content: "You are Finzo, a friendly Indian financial advisor. Always structure your responses with proper formatting, spacing, and clear sections. Use bullet points, bold text for emphasis, and maintain consistent spacing. Keep responses clear, well-organized, and easy to read."
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 1500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    if (!completion.choices[0]?.message) {
      throw new Error('No response from OpenAI')
    }

    return NextResponse.json({ 
      result: completion.choices[0].message
    })

  } catch (error: any) {
    console.error('Error in chat API:', error)
    
    // More specific error messages
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}

