'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

// Define tax slab structure
interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

// Updated tax slabs for both regimes
const newRegimeSlabs: TaxSlab[] = [
  { min: 0, max: 1200000, rate: 0 },
  { min: 1200001, max: 1500000, rate: 0.10 },
  { min: 1500001, max: 2000000, rate: 0.15 },
  { min: 2000001, max: 3000000, rate: 0.20 },
  { min: 3000001, max: Infinity, rate: 0.30 }
];

const oldRegimeSlabs: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 0.05 },
  { min: 500001, max: 1000000, rate: 0.20 },
  { min: 1000001, max: Infinity, rate: 0.30 }
];

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SAMPLE_PROMPTS = [
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

export function ChatInterface() {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')

  // Auto-scroll chat container when new content arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [messages, streamingMessage])

  const handleStream = async (response: Response) => {
    if (!response.body) return

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let streamedContent = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        streamedContent += chunk
        setStreamingMessage(streamedContent)
      }
    } finally {
      reader.releaseLock()
      setMessages(prev => [...prev, { role: 'assistant', content: streamedContent }])
      setStreamingMessage('')
      setIsLoading(false)
    }
  }

  const handlePromptClick = async (prompt: string) => {
    if (isLoading) return
    setHasStartedChat(true)
    setStreamingMessage('')
    
    // Immediately add user message
    setMessages(prev => [...prev, { role: 'user', content: prompt }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: prompt }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      await handleStream(response)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    setHasStartedChat(true)
    setStreamingMessage('')

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      await handleStream(response)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFAFF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-purple-600 mb-4">Ask Finzo</h1>
          <p className="text-2xl text-gray-600">Your Financial Guide</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-lg flex flex-col h-[700px]">
          {/* Messages Area with proper scrolling */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-6 overflow-y-auto custom-scrollbar scroll-smooth"
          >
            {!hasStartedChat ? (
              <div className="h-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  How can I help you today?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                  {SAMPLE_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt.question)}
                      disabled={isLoading}
                      className="bg-white p-6 rounded-2xl text-left transition-all hover:bg-gray-50 border-2 border-gray-100 hover:border-purple-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-purple-700">
                        {prompt.question}
                      </h3>
                      <p className="text-purple-600 font-medium text-sm">
                        {prompt.category}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-3xl px-6 py-4 ${
                          message.role === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-lg">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}
                  {streamingMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-3xl px-6 py-4 bg-gray-100 text-gray-900">
                        <div className="whitespace-pre-wrap text-lg">{streamingMessage}</div>
                      </div>
                    </motion.div>
                  )}
                  {isLoading && !streamingMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-3xl px-6 py-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-6 border-t bg-white">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Indian finance..."
                className="w-full pr-32 p-6 rounded-3xl border-2 border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

