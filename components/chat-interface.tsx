'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

export function ChatInterface() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    {
      role: 'assistant',
      content: `# 👋 Heyaa!

This is Finzo, your finance buddy.

Let's tackle your money matters together — no stress, just simple, helpful advice.

I've got you covered with:
- Less scary taxes (yes, it's possible!)
- Budgeting made easy (and fun!)
- Investment tips that actually make sense

I'm your go-to for:
- Smart saving without sacrificing your ☕
- Hidden tax benefits you shouldn't miss
- Step-by-step wealth growth

What's on your mind today? Let's chat! 💭`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: messages.concat(userMessage),
          threadId: threadId 
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch response')

      const data = await response.json()
      
      if (data.result) {
        setThreadId(data.result.threadId)
        setMessages(prev => [...prev, { role: 'assistant', content: data.result.content }])
      } else {
        throw new Error('Invalid response format')
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Oops! Let me try that again. Could you please rephrase your question? 😊" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <div className="bg-white/90 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-purple-700">
        <h2 className="text-lg font-semibold text-white">Hi, I am Finzo ✨</h2>
      </div>

      {/* Messages Area */}
      <ScrollArea 
        ref={scrollRef}
        className="h-[500px] p-6 bg-gradient-to-b from-purple-50/50 via-white/50 to-purple-50/50"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-purple-100 shadow-sm hover:shadow-md transition-shadow'
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-semibold mb-2">{children}</h1>
                      ),
                      p: ({ children }) => (
                        <p className="m-0 leading-relaxed tracking-wide">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-2 my-2">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2">
                          <span className="select-none">•</span>
                          <span>{children}</span>
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 mb-6"
          >
            <div className="p-4 rounded-2xl bg-white rounded-tl-none border border-purple-100 shadow-sm">
              <div className="flex gap-2">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-purple-600/60" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-purple-600/60" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-purple-600/60" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t bg-white/95 backdrop-blur-sm"
      >
        <div className="flex gap-3">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say hi! Let's talk about your finances..."
            className="flex-grow bg-gray-50/80 border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-all rounded-xl"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-purple-600 text-white hover:bg-purple-700 px-6 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

