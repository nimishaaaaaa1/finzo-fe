import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ASSISTANT_ID = "asst_gsS3yKgUv8xgP6kk97hO0F9j"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Create a thread
    const thread = await openai.beta.threads.create()

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    })

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed')
      }
    }

    // Get the assistant's response
    const threadMessages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = threadMessages.data[0]

    // Type check the content
    if (!lastMessage.content[0] || lastMessage.content[0].type !== 'text') {
      throw new Error('No text content in response')
    }

    return NextResponse.json({ 
      result: { 
        content: lastMessage.content[0].text.value 
      } 
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch response from OpenAI' },
      { status: 500 }
    )
  }
}

