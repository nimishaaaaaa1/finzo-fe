'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatInterface() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    {
      role: 'assistant',
      content: `# 👋 Welcome to Finzo!

I'm your all-in-one platform for:
- 📊 Simplifying taxes
- 💰 Mastering budgeting
- 📈 Making smart investments

I provide intuitive tools and expert advice to help you:
- Manage your finances with ease
- Reduce tax burdens
- Grow your wealth

**No jargons, no stress, only results.**

How can I assist you today?`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const recentMessages = messages.slice(-2).concat(userMessage)
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: recentMessages }),
      })

      if (!response.ok) throw new Error('Failed to fetch response')
      const data = await response.json()
      
      if (data.result) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.result.content }])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error. Please try again." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <ScrollArea className="h-[500px] p-6 bg-gradient-to-b from-gray-50 to-white scroll-smooth">
        <AnimatePresence>
          {messages.map((message: { role: 'user' | 'assistant' | 'system', content: string }, index) => (
            message.role !== 'system' && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
                className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-4 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-sm ${
                    message.role === 'user'
                      ? 'bg-primary/95 text-primary-foreground rounded-tr-none'
                      : 'bg-white/95 text-gray-800 rounded-tl-none border border-gray-100'
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
                      a: ({ children, href }) => (
                        <a 
                          href={href} 
                          className="text-blue-500 hover:underline transition-colors" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      code: ({ children }) => (
                        <code className="bg-white/80 rounded px-1.5 py-0.5 font-mono text-sm">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </span>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-left mb-6"
          >
            <span className="inline-block p-3 rounded-2xl bg-white/95 text-gray-800 rounded-tl-none border border-gray-100 shadow-sm">
              <div className="flex gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]" />
              </div>
            </span>
          </motion.div>
        )}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex p-4 border-t bg-white/95 backdrop-blur-sm">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow mr-3 bg-gray-50/80 border-gray-200 focus:border-primary/30 focus:ring-primary/20 transition-all"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 transition-colors"
        >
          Send
        </Button>
      </form>
    </div>
  )
}

