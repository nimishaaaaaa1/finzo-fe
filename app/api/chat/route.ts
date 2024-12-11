import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ASSISTANT_ID = "asst_gsS3yKgUv8xgP6kk97hO0F9j"

export async function POST(req: Request) {
  try {
    const { messages, threadId } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Use existing thread or create a new one
    const thread = threadId 
      ? { id: threadId }
      : await openai.beta.threads.create()

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    })

    // Poll for completion with timeout
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    let attempts = 0
    const maxAttempts = 10 // Timeout after 10 attempts
    
    while (runStatus.status !== 'completed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      attempts++
      
      if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
        throw new Error(`Assistant run ${runStatus.status}`)
      }
    }

    if (attempts >= maxAttempts) {
      throw new Error('Response timeout')
    }

    // Get the assistant's response
    const threadMessages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = threadMessages.data[0]

    if (!lastMessage.content[0] || lastMessage.content[0].type !== 'text') {
      throw new Error('No text content in response')
    }

    return NextResponse.json({ 
      result: { 
        content: lastMessage.content[0].text.value,
        threadId: thread.id // Return threadId to maintain conversation
      } 
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch response from OpenAI. Please try again.' },
      { status: 500 }
    )
  }
}

