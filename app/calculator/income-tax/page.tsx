'use client'
import React, { useState } from 'react'
// Assuming the correct path to IncomeTaxCalculator is '../../IncomeTaxCalculator'

interface TaxInput {
  income: number
  regime: 'old' | 'new'
}

export default function IncomeTaxCalculatorPage() {
  const [taxInput, setTaxInput] = useState<TaxInput>({
    income: 0,
    regime: 'new'
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Income Tax Calculator</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <input
                type="number"
                value={taxInput.income}
                onChange={(e) => setTaxInput({
                  ...taxInput,
                  income: Number(e.target.value)
                })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Regime
              </label>
              <select
                value={taxInput.regime}
                onChange={(e) => setTaxInput({
                  ...taxInput,
                  regime: e.target.value as 'old' | 'new'
                })}
                className="w-full p-2 border rounded"
              >
                <option value="new">New Regime</option>
                <option value="old">Old Regime</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 