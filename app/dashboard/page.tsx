'use client'
import React, { useState } from 'react'
import Link from 'next/link'

type CalculatorType = 'income-tax' | 'tds' | 'gst' | 'salary'

interface Calculator {
  id: CalculatorType
  name: string
  path: string
}

export default function DashboardPage() {
  const calculators: Calculator[] = [
    { id: 'income-tax', name: 'Income Tax Calculator', path: '/calculator/income-tax' },
    { id: 'tds', name: 'TDS Calculator', path: '/calculator/tds' },
    { id: 'gst', name: 'GST Calculator', path: '/calculator/gst' },
    { id: 'salary', name: 'Salary Calculator', path: '/calculator/salary' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Financial Calculators</h1>
          <p className="text-gray-600">Calculate taxes and plan your finances</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              href={calc.path}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{calc.name}</h2>
              <p className="text-gray-600">Calculate and plan your {calc.id}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 