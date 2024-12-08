import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Finzo</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="mb-4">
            Finzo is an AI-powered assistant designed to revolutionize financial planning and tax compliance in India. 
            Our mission is to make expert financial advice accessible to everyone, from salaried employees to business 
            owners and investors.
          </p>
          <p className="mb-4">
            Founded by Nimisha Chanda, Finzo combines cutting-edge AI technology with deep expertise in Indian 
            taxation and financial markets. We stay up-to-date with the latest regulations and market trends to 
            provide you with accurate, timely, and personalized advice.
          </p>
          <p>
            Whether you're looking to optimize your tax strategy, create a budget that works for you, or make smart 
            investment decisions, Finzo is here to guide you every step of the way.
          </p>
        </div>
        <div className="flex justify-center">
          <Image 
            src="/placeholder.svg" 
            alt="Finzo Team" 
            width={400} 
            height={300} 
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  )
}

