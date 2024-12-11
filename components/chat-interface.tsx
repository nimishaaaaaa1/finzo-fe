'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'

const SAMPLE_PROMPTS = [
  {
    text: "Explain the difference between the old and new tax regime",
    category: "Taxation"
  },
  {
    text: "Suggest good investments for a Balanced investor",
    category: "Investment"
  },
  {
    text: "I have an SIP of Rs 5000 per month but I also invest in stocks",
    category: "Portfolio"
  },
  {
    text: "Which small-cap mutual funds are best for me to invest in 2024?",
    category: "Mutual Funds"
  }
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e === 'string') {
      sendMessage(e)
    } else {
      e.preventDefault()
      if (input.trim()) {
        sendMessage(input)
        setInput('')
      }
    }
  }

  const sendMessage = async (content: string) => {
    setIsLoading(true)
    const newMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, newMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      })

      if (!response.ok) throw new Error('Failed to fetch response')

      const data = await response.json()
      if (data.result) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.result.content 
        }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered an error. Please try again." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-600 mb-1 sm:mb-2">Ask Finzo</h1>
        <p className="text-lg sm:text-xl text-purple-600">Your Financial Guide</p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] shadow-xl border border-purple-100/50">
        {/* Show Prompts only when no messages */}
        {messages.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6">
            {SAMPLE_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSubmit(prompt.text)}
                className="group bg-white p-4 rounded-2xl text-left border border-gray-100 hover:shadow-sm transition-all"
              >
                <p className="text-gray-900 text-sm sm:text-base mb-2">{prompt.text}</p>
                <span className="text-purple-500 text-xs sm:text-sm font-medium">{prompt.category}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message Area */}
        {messages.length > 0 && (
          <ScrollArea className="px-4 sm:px-6 py-4 h-[350px] sm:h-[400px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-50 text-gray-900'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown 
                      className="prose prose-sm max-w-none
                        prose-headings:font-semibold 
                        prose-h2:text-lg prose-h2:text-purple-900 prose-h2:mt-4 prose-h2:mb-2
                        prose-h3:text-base prose-h3:text-purple-800 prose-h3:mt-3 prose-h3:mb-2
                        prose-p:mb-2 prose-p:leading-relaxed
                        prose-ul:my-2 prose-ul:space-y-1
                        prose-li:mb-1 prose-li:leading-relaxed
                        prose-strong:text-purple-900 prose-strong:font-semibold
                        prose-table:my-2 prose-table:border-collapse
                        prose-th:py-2 prose-th:px-4 prose-th:bg-purple-50
                        prose-td:py-2 prose-td:px-4
                        first:prose-p:mt-0 last:prose-p:mb-0
                        prose-ul:list-none prose-ul:pl-0
                        prose-li:before:content-['•'] prose-li:before:text-purple-500 prose-li:before:mr-2
                        prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline"
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-4 rounded-2xl bg-gray-50">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-purple-600/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-purple-600/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-purple-600/60 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        )}

        {/* Chat Input */}
        <div className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-50/80 p-2 rounded-full border border-gray-100">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Indian finance..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-2 text-sm sm:text-base placeholder:text-gray-400"
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 rounded-full px-6 sm:px-8 text-sm sm:text-base"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

