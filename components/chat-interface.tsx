'use client'

import { useState } from 'react'
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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm Finzo, your AI financial guide. I can help you with:

• Tax calculations and planning
• Investment advice and strategies
• Budgeting and savings tips
• Latest financial updates

What would you like to know about?`
    }
  ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    let response = ''
    const lowerCaseInput = userMessage.toLowerCase()

    if (lowerCaseInput.includes('which regime') || lowerCaseInput.includes('better')) {
      response = `Let me help you choose the best tax regime for FY 2025-26:

NEW REGIME benefits:
✓ No tax up to ₹12L (₹12.75L for salaried)
✓ Higher standard deduction (₹75,000)
✓ Lower tax rates overall
✗ No additional deductions available

OLD REGIME benefits:
✓ Standard deduction: ₹50,000 (unchanged)
✓ Comprehensive deductions:
  • Section 80C: ₹1.5L
  • Section 80D: Health Insurance
  • HRA Benefits
  • Home Loan Benefits
  • NPS Benefits

The old regime might be better if you:
• Have high HRA claims
• Maximize 80C investments
• Pay home loan EMIs
• Have medical insurance

Would you like me to calculate your tax under both regimes?`
    } 
    else if (lowerCaseInput.includes('old regime')) {
      response = `Old Tax Regime for FY 2025-26:

Tax Slabs:
• Up to ₹2.5L → 0%
• ₹2.5L to ₹5L → 5%
• ₹5L to ₹10L → 20%
• Above ₹10L → 30%

Key Features:
✓ Standard Deduction: ₹50,000
✓ Section 80C: Up to ₹1.5L
✓ Section 80D: Health Insurance
✓ HRA and other exemptions available
✓ Rebate u/s 87A up to ₹5L income

Would you like to calculate your tax liability?`
    }
    else if (lowerCaseInput.includes('new regime')) {
      response = `New Tax Regime for FY 2025-26:

Tax Slabs:
• Up to ₹12L → 0%
• ₹12L to ₹15L → 10%
• ₹15L to ₹20L → 15%
• ₹20L to ₹30L → 20%
• Above ₹30L → 30%

Key Benefits:
✓ Higher Standard Deduction: ₹75,000
✓ No tax up to ₹12.75L for salaried
✓ Simplified tax structure
✓ Lower tax rates

Shall I help you calculate your tax?`
    }
    else if (lowerCaseInput.includes('deduction')) {
      response = `Standard Deduction & Benefits (FY 2025-26):

NEW REGIME:
✓ ₹75,000 standard deduction for salaried/pensioners
✓ Makes income up to ₹12.75L tax-free
✗ No additional deductions available

OLD REGIME:
✓ ₹50,000 standard deduction (unchanged)
✓ Major deductions available:
  • Section 80C: Up to ₹1.5L
    - PPF, ELSS, EPF, Life Insurance
    - Home Loan Principal, Tuition Fees
  • Section 80D: Health Insurance
    - Self & Family: Up to ₹25,000
    - Parents: Up to ₹50,000
  • HRA Benefits
  • Home Loan Interest: Up to ₹2L
  • NPS: Additional ₹50,000 u/s 80CCD(1B)

Would you like me to calculate your tax savings with these deductions?`
    }

    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-600 mb-4">Ask Finzo</h1>
          <p className="text-xl text-gray-600">Your Financial Guide</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Explain the difference between the old and new tax regime</h3>
            <p className="text-purple-600">Taxation</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Suggest good investments for a Balanced investor</h3>
            <p className="text-purple-600">Investment</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">I have an SIP of Rs 5000 per month but I also invest in stocks</h3>
            <p className="text-purple-600">Portfolio</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Which small-cap mutual funds are best for me to invest in 2024?</h3>
            <p className="text-purple-600">Mutual Funds</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Indian finance..."
              className="flex-1 rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

