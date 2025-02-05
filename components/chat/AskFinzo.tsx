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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-purple-600 mb-3">Ask Finzo</h1>
        <p className="text-xl text-gray-600">Your Financial Guide</p>
      </div>

      <div className="mb-8 space-y-4 h-[400px] overflow-y-auto p-4 rounded-xl bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-4 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="text-left p-6 rounded-xl bg-white shadow-sm hover:shadow-md 
                     border border-gray-100 hover:border-purple-300 transition-all duration-200
                     group cursor-pointer"
          >
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-purple-600 
                         transition-colors duration-200">
              {prompt.question}
            </h3>
            <span className="inline-block mt-2 text-sm text-purple-600 font-medium">
              {prompt.category}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Indian finance..."
          className="flex-1 p-4 rounded-xl border border-gray-200 focus:ring-2 
                   focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-8 py-4 bg-purple-600 text-white rounded-xl 
                   hover:bg-purple-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}