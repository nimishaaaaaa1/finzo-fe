'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: '/linkedin.svg',
      href: 'https://www.linkedin.com/in/nimisha-chanda/',
      description: 'Connect with me',
      bgColor: 'bg-[#0A66C2]/10'
    },
    {
      name: 'Twitter',
      icon: '/twitter.svg',
      href: 'https://twitter.com/NimishaChanda',
      description: 'Follow for updates',
      bgColor: 'bg-[#1DA1F2]/10'
    },
    {
      name: 'Instagram',
      icon: '/instagram.svg',
      href: 'https://www.instagram.com/zest_lives/',
      description: 'Follow my journey',
      bgColor: 'bg-gradient-to-tr from-[#FED373]/10 via-[#F15245]/10 to-[#D92E7F]/10'
    },
    {
      name: 'Topmate',
      icon: '/topmate.svg',
      href: 'https://topmate.io/nimisha_chanda/1306249',
      description: "Have feedback? Let's connect",
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">Connect with me on social media</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${link.bgColor}`}>
                      <Image src={link.icon} alt={link.name} width={24} height={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{link.name}</h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Chat with Finzo CTA */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Need Quick Answers?</h2>
              <p className="text-gray-600 mb-6">Get instant responses to your financial queries</p>
              <Link 
                href="/#chat-section"
                className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Chat with Finzo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

