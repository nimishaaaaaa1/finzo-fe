import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Welcome to Finzo</h1>
      <p className="text-xl md:text-2xl mb-8 text-center">Your AI assistant for Indian taxation, budgeting, and investment advice.</p>
      <p className="text-lg mb-12 text-center font-semibold">BY NIMISHA CHANDA</p>
      <div className="flex justify-center mb-12">
        <Button asChild className="mr-4">
          <Link href="/services">Our Services</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Taxation Advice</h2>
          <p>Get expert guidance on Indian income tax and GST regulations.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Budgeting Tips</h2>
          <p>Learn how to manage your finances effectively with personalized budgeting advice.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Investment Strategies</h2>
          <p>Discover smart investment opportunities tailored to your financial goals.</p>
        </div>
      </div>
    </div>
  )
}

