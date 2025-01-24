'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
  }

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
          </form>
        </div>
      </div>
    </div>
  )
}

