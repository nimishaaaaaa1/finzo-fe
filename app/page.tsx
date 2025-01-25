'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChatInterface } from '@/components/chat-interface'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
              Secure Your <span className="text-purple-600">Financial Future</span> with Finzo
            </h1>
            
            <p className="text-lg text-purple-600 font-medium mb-6">
              By Nimisha Chanda
            </p>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Your intelligent financial companion that simplifies taxes, optimizes budgets, and guides investments. Experience the future of personal finance management.
            </p>
            
            <div className="flex justify-center gap-6 mb-12 text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>Real-time Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>Bank-Grade Security</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button 
                asChild 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                <Link href="/services">Start Your Journey</Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-2 border-purple-200 hover:border-purple-300 px-8 py-6 text-lg rounded-xl"
              >
                <Link 
                  href="https://topmate.io/nimisha_chanda/1306249" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Have Feedback?
                </Link>
              </Button>
            </div>

            <div className="relative mx-auto max-w-5xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative aspect-video">
                  <Image
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
                    alt="Finzo Dashboard Preview"
                    fill
                    className="object-cover brightness-95 contrast-125"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                  
                  {/* Investment Growth Widget */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-10 left-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        📈
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">Investment Growth</div>
                        <div className="text-green-500">+24.8%</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tax Savings Widget */}
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute top-10 right-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        💸
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">Tax Savings</div>
                        <div className="text-green-500">₹45,000</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-100 to-pink-100 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
              <h2 className="text-purple-600 font-medium">OUR SERVICES</h2>
              <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Everything you need to manage your finances
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-2xl group hover:shadow-lg transition-all"
                >
                  <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-24 bg-white" id="calculators">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
              <h2 className="text-purple-600 font-medium">CALCULATORS</h2>
              <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Financial Calculators
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.path}
                  className="group bg-gradient-to-b from-purple-50 to-white p-8 rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    {calc.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{calc.name}</h3>
                  <p className="text-gray-600">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ChatInterface />
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    icon: "📊",
    title: "Taxation Advice",
    description: "Expert guidance on income tax and GST regulations with personalized recommendations."
  },
  {
    icon: "💰",
    title: "Budgeting Tips",
    description: "Learn effective financial management with custom budgeting strategies."
  },
  {
    icon: "📈",
    title: "Investment Strategies",
    description: "Discover smart investment opportunities aligned with your financial goals."
  }
]

const calculators = [
  {
    id: 'income-tax',
    name: 'Income Tax Calculator',
    description: 'Calculate your tax liability for both new & old regime',
    path: '/calculator/income-tax',
    icon: '💰'
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    description: 'Calculate GST and final price for different rates',
    path: '/calculator/gst',
    icon: '📊'
  },
  {
    id: 'tds',
    name: 'TDS Calculator',
    description: 'Calculate TDS rates and final deduction amount',
    path: '/calculator/tds',
    icon: '📋'
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    description: 'Plan your mutual fund investments',
    path: '/calculator/sip',
    icon: '📈'
  },
  {
    id: 'ppf',
    name: 'PPF Calculator',
    description: 'Calculate PPF returns over time',
    path: '/calculator/ppf',
    icon: '🏦'
  },
  {
    id: 'fd',
    name: 'FD Calculator',
    description: 'Calculate fixed deposit returns',
    path: '/calculator/fd',
    icon: '💵'
  }
]

