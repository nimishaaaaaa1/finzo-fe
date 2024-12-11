import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ASSISTANT_ID = "asst_gsS3yKgUv8xgP6kk97hO0F9j"

export async function POST(req: Request) {
  try {
    // Validate request
    if (!req.body) {
      return NextResponse.json(
        { error: 'Missing request body' },
        { status: 400 }
      )
    }

    const { messages } = await req.json()
    if (!messages || !messages.length) {
      return NextResponse.json(
        { error: 'Missing messages in request' },
        { status: 400 }
      )
    }

    const userMessage = messages[messages.length - 1].content

    // Create thread with error handling
    let thread
    try {
      thread = await openai.beta.threads.create()
    } catch (error) {
      console.error('Error creating thread:', error)
      return NextResponse.json(
        { error: 'Failed to create thread. Please check your API key.' },
        { status: 500 }
      )
    }

    // Add message to thread
    try {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userMessage
      })
    } catch (error) {
      console.error('Error adding message:', error)
      return NextResponse.json(
        { error: 'Failed to add message to thread' },
        { status: 500 }
      )
    }

    // Run the assistant
    let run
    try {
      run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID
      })
    } catch (error) {
      console.error('Error starting run:', error)
      return NextResponse.json(
        { error: 'Failed to start assistant run' },
        { status: 500 }
      )
    }

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    let attempts = 0
    const maxAttempts = 30 // 30 seconds timeout

    while (runStatus.status !== 'completed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      attempts++
    }

    if (runStatus.status !== 'completed') {
      return NextResponse.json(
        { error: `Assistant run ${runStatus.status}` },
        { status: 500 }
      )
    }

    // Get the response
    const threadMessages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = threadMessages.data[0]

    if (!lastMessage?.content?.[0]?.type === 'text') {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      result: {
        content: lastMessage.content[0].text.value
      }
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

