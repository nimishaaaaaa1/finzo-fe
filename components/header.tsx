'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#211A1F] text-[#FFE7E6] p-4 shadow-md z-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/finzo-logo.svg"
            alt="Finzo Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link href="/" className="text-[#FFE7E6] hover:text-purple-300 transition-colors">Home</Link></li>
            <li><Link href="/services" className="text-[#FFE7E6] hover:text-purple-300 transition-colors">Services</Link></li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-[#FFE7E6] hover:text-purple-300 transition-colors">
                  Calculators
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/calculators/investment">Investment Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/calculators/investment-simulation">Investment Simulator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/calculators/income-tax">Income Tax Calculator</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li><Link href="/about" className="text-[#FFE7E6] hover:text-purple-300 transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-[#FFE7E6] hover:text-purple-300 transition-colors">Contact</Link></li>
          </ul>
        </nav>
        <Button 
          className="md:hidden bg-transparent text-[#FFE7E6] hover:bg-[#2a2329]" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </Button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 max-w-5xl mx-auto px-4">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/services" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li className="px-2 py-1">
              <div className="font-medium mb-1">Calculators</div>
              <ul className="pl-4 space-y-1">
                <li><Link href="/calculators/investment" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Investment Calculator</Link></li>
                <li><Link href="/calculators/investment-simulation" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Investment Simulator</Link></li>
                <li><Link href="/calculators/income-tax" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Income Tax Calculator</Link></li>
              </ul>
            </li>
            <li><Link href="/about" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" className="block text-[#FFE7E6] hover:text-purple-300 transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

