import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Finzo</h1>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">Your Intelligent Financial Companion</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Finzo is an assistant designed to revolutionize financial planning
              and tax compliance in India. Our mission is to make expert financial advice
              accessible to everyone, from salaried employees to business owners and
              investors.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Created by Nimisha Chanda, Finzo combines cutting-edge technology with
              deep expertise in Indian taxation and financial markets. We stay up-to-date with
              the latest regulations and market trends to provide you with accurate, timely,
              and personalized advice.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
              alt="Financial Planning"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
              alt="Financial Technology"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're looking to optimize your tax strategy, create a budget that works
              for you, or make smart investment decisions, Finzo is here to guide you every
              step of the way.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Personalized financial guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Up-to-date with latest financial regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Expert insights on Indian markets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">24/7 accessible financial assistance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=2070"
                  alt="Innovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-700">Leveraging cutting-edge technology to provide smart financial solutions</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070"
                  alt="Expertise"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise</h3>
                <p className="text-gray-700">Deep understanding of Indian financial markets and regulations</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                  alt="Accessibility"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-700">Making expert financial advice available to everyone</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-purple-100 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience personalized financial guidance with Finzo today
          </p>
          <Link 
            href="/#chat-section"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Chat with Finzo
          </Link>
        </div>
      </div>
    </main>
  )
}

