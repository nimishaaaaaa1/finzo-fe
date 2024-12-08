import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChatInterface } from '@/components/chat-interface'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Hi! This is Finzo
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto text-center mb-8 leading-relaxed font-light">
            Your financial advisor, helping you file taxes smarter, budget your expenses and diversify your investment portfolio — all in one place.
          </p>
          <p className="text-base text-gray-500 text-center mb-16 font-medium">By Nimisha Chanda</p>
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              asChild 
              className="bg-white text-black border-2 border-black hover:bg-gray-50 px-8 py-6 text-lg font-medium rounded-none shadow-sm"
            >
              <Link href="/services">Our Services</Link>
            </Button>
            <Button 
              asChild 
              className="bg-white text-black border-2 border-black hover:bg-gray-50 px-8 py-6 text-lg font-medium rounded-none shadow-sm"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Taxation Advice</h2>
              <p className="text-gray-600">Get expert guidance on Indian income tax and GST regulations.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Budgeting Tips</h2>
              <p className="text-gray-600">Learn how to manage your finances effectively with personalized budgeting advice.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Investment Strategies</h2>
              <p className="text-gray-600">Discover smart investment opportunities tailored to your financial goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ChatInterface />
        </div>
      </section>
    </div>
  )
}

