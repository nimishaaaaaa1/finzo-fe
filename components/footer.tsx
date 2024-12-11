'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#211A1F] text-[#FFE7E6] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#FFE7E6]">Finzo</h3>
          <p className="text-gray-300">Empowering Indians to make smarter financial decisions with my insights, personalized tax strategies, and investment guidance.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFE7E6]">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-300 hover:text-purple-300 transition-colors">Home</Link></li>
            <li><Link href="/services" className="text-gray-300 hover:text-purple-300 transition-colors">Services</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-purple-300 transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-purple-300 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFE7E6]">Contact Us</h4>
          <div className="space-y-3">
            <a 
              href="mailto:work.nimishachanda@gmail.com"
              className="text-gray-300 hover:text-purple-300 transition-colors block"
            >
              Email
            </a>
            <a 
              href="https://x.com/NimishaChanda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors block"
            >
              Twitter
            </a>
            <a 
              href="https://www.linkedin.com/in/nimisha-chanda/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors block"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.instagram.com/zest_lives/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors block"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center border-t border-gray-800 pt-8">
        <p className="text-gray-400">&copy; 2024 Finzo. All rights reserved.</p>
      </div>
    </footer>
  )
}

