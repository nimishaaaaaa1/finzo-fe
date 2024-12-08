'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FFE7E6] text-[#211A1F] p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/Finzo-logo.jpeg"
            alt="Finzo Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </nav>
        <Button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </Button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/services" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/about" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

