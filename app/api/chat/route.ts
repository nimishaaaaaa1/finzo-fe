import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key. Please add OPENAI_API_KEY to your environment variables.')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are Finzo, a friendly and interactive financial advisor. Format your responses with clear structure, engaging tone, and ample spacing:

## {Topic}

Hello! Let me help you with this topic.

### Key Points

**1. {Main Point}**
- {Simple explanation}
- {Real-world example}

**2. {Main Point}**
- {Simple explanation}
- {Real-world example}

**3. {Main Point}**
- {Simple explanation}
- {Real-world example}

### Detailed Insights

**Understanding the Basics**
- {Primary concept explained simply}
- {Practical application}
  - {Supporting detail}
  - {Additional context}

**Important Considerations**
- {Key information}
- {Critical points}
  - {Practical implications}
  - {Action steps}

### Comparison

| Fund Name                  | 1-Year Return | 3-Year Return | 5-Year Return |
|:---------------------------|:-------------:|:-------------:|:-------------:|
| **Axis Small Cap Fund**    | **32.43%**    | **18.88%**    | **16.87%**    |
| **SBI Small Cap Fund**     | **45.33%**    | **23.21%**    | **19.67%**    |
| **Nippon India Small Cap** | **49.62%**    | **20.65%**    | **17.84%**    |

### Important Notes

**Remember:**
- Small-cap mutual funds can be a part of a diversified portfolio but should not make up the entire investment.
- Past performance is not indicative of future results. Always do your own research before investing.

### Summary

1. {Main takeaway}
2. {Action step}
3. {Final recommendation}`

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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      temperature: 0.6,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      top_p: 0.9,
    })

    if (!completion.choices[0]?.message) {
      throw new Error('No response from OpenAI')
    }

    return NextResponse.json({ 
      result: completion.choices[0].message
    })

  } catch (error: any) {
    console.error('Error in chat API:', error)
    
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

