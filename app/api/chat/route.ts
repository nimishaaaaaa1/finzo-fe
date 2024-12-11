import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ASSISTANT_ID = "asst_gsS3yKgUv8xgP6kk97hO0F9j"

export async function POST(req: Request) {
  try {
    // Log the start of the request
    console.log('Starting chat request...')
    
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content
    
    console.log('Creating thread...')
    const thread = await openai.beta.threads.create()
    console.log('Thread created:', thread.id)

    console.log('Adding message to thread...')
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage
    })

    console.log('Starting assistant run...')
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    })

    console.log('Waiting for completion...')
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    
    // Wait for a maximum of 30 seconds
    let attempts = 0
    while (runStatus.status !== 'completed' && attempts < 30) {
      console.log('Run status:', runStatus.status)
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      attempts++
    }

    if (runStatus.status !== 'completed') {
      console.log('Run timed out or failed:', runStatus.status)
      throw new Error(`Assistant run ${runStatus.status}`)
    }

    console.log('Getting messages...')
    const threadMessages = await openai.beta.threads.messages.list(thread.id)
    
    if (!threadMessages.data || threadMessages.data.length === 0) {
      console.log('No messages found in thread')
      throw new Error('No messages found')
    }

    const lastMessage = threadMessages.data[0]
    
    if (!lastMessage.content || !lastMessage.content[0]) {
      console.log('No content in message')
      throw new Error('Empty message content')
    }

    const content = lastMessage.content[0]
    if (content.type !== 'text') {
      console.log('Message content is not text:', content.type)
      throw new Error('Invalid content type')
    }

    console.log('Successfully got response')
    return NextResponse.json({ 
      result: { 
        content: content.text.value
      } 
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process your request. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

