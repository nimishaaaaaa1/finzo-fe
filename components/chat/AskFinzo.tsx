import { useState } from 'react'

interface Prompt {
  question: string
  category: string
}

const PROMPTS: Prompt[] = [
  {
    question: "Explain the difference between the old and new tax regime",
    category: "Taxation"
  },
  {
    question: "Suggest good investments for a Balanced investor",
    category: "Investment"
  },
  {
    question: "I have an SIP of Rs 5000 per month but I also invest in stocks",
    category: "Portfolio"
  },
  {
    question: "Which small-cap mutual funds are best for me to invest in 2024?",
    category: "Mutual Funds"
  }
]

export default function AskFinzo() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptClick = (prompt: Prompt) => {
    setInput(prompt.question)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: input }])

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: input }]
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      setInput('')
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-[#8257E6] mb-2">Ask Finzo</h1>
        <p className="text-gray-600">Your Financial Guide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="w-full text-left p-4 rounded-lg bg-white hover:bg-gray-50 
                     transition-all duration-200 cursor-pointer"
          >
            <p className="text-gray-800 text-base mb-1">
              {prompt.question}
            </p>
            <span className="text-[#8257E6] text-sm">
              {prompt.category}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Indian finance..."
          className="w-full p-4 pr-24 rounded-lg border border-gray-200 
                   focus:outline-none focus:border-[#8257E6]"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2
                   px-6 py-2 bg-[#8257E6] text-white rounded-lg
                   hover:bg-[#7048d5] transition-colors"
          disabled={isLoading}
        >
          Send
        </button>
      </form>

      {messages.length > 0 && (
        <div className="mt-8 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[#8257E6] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                Thinking...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}