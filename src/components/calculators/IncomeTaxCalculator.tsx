'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const IncomeTaxCalculator = () => {
  // State management
  const [incomeDetails, setIncomeDetails] = useState<IncomeDetails>({
    salaryIncome: '',  // Changed from 0 to empty string
    otherIncome: '',   // Changed from 0 to empty string
    rentalIncome: '',  // Changed from 0 to empty string
    homeLoanInterest: ''  // Changed from 0 to empty string
  });
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [isSalaried, setIsSalaried] = useState<boolean>(true);

  // Updated tax slabs for 2025-26 (New Regime)
  const newRegimeSlabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: Infinity, rate: 30 }
  ];

  // Old Regime Slabs
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
  ];

  // Calculate tax based on regime and income
  const calculateTax = () => {
    const slabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;
    let tax = 0;
    let remainingIncome = calculateTotalIncome();

    // Standard Deduction
    if (isSalaried) {
      remainingIncome -= 75000; // Rs 75,000 standard deduction
    }

    // Calculate tax slab-wise
    for (const slab of slabs) {
      if (remainingIncome > slab.min) {
        const taxableInThisSlab = Math.min(remainingIncome - slab.min, slab.max - slab.min);
        tax += (taxableInThisSlab * slab.rate) / 100;
      }
    }

    // Section 87A Rebate
    if (regime === 'new' && calculateTotalIncome() <= 1200000) {
      tax = 0; // No tax up to 12 lakhs in new regime
    } else if (regime === 'old' && calculateTotalIncome() <= 500000) {
      tax = 0; // No tax up to 5 lakhs in old regime
    }

    return tax;
  };

  // Add the function inside the component
  const calculateTotalIncome = () => {
    return (
      Number(incomeDetails.salaryIncome || 0) +
      Number(incomeDetails.otherIncome || 0) +
      Number(incomeDetails.rentalIncome || 0)
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Income Tax Calculator 2025-26</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Income Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Salary Income
              </label>
              <input
                type="number"
                value={incomeDetails.salaryIncome}
                onChange={(e) => setIncomeDetails({
                  ...incomeDetails,
                  salaryIncome: e.target.value  // Remove Number() conversion
                })}
                placeholder="Enter your annual salary"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Income Sources
              </label>
              <input
                type="number"
                value={incomeDetails.otherIncome}
                onChange={(e) => setIncomeDetails({
                  ...incomeDetails,
                  otherIncome: e.target.value
                })}
                placeholder="Enter other income"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Income (if any)
              </label>
              <input
                type="number"
                value={incomeDetails.rentalIncome}
                onChange={(e) => setIncomeDetails({
                  ...incomeDetails,
                  rentalIncome: e.target.value
                })}
                placeholder="Enter rental income"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Loan Interest
              </label>
              <input
                type="number"
                value={incomeDetails.homeLoanInterest}
                onChange={(e) => setIncomeDetails({
                  ...incomeDetails,
                  homeLoanInterest: e.target.value
                })}
                placeholder="Enter home loan interest"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Regime Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Regime</label>
          <select
            value={regime}
            onChange={(e) => setRegime(e.target.value as 'new' | 'old')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="new">New Regime</option>
            <option value="old">Old Regime</option>
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Type</label>
          <select
            value={isSalaried ? 'salaried' : 'non-salaried'}
            onChange={(e) => setIsSalaried(e.target.value === 'salaried')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="salaried">Salaried</option>
            <option value="non-salaried">Non-Salaried</option>
          </select>
        </div>

        {/* Tax Calculation Result */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold">Estimated Tax: ₹{calculateTax().toLocaleString()}</h3>
        </div>

        {/* Key Features */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Budget 2025 Key Updates</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              No tax up to ₹12 lakh income in new regime (₹12.75 lakh for salaried)
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              New 25% tax slab for income between ₹20-24 lakh
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Standard deduction of ₹75,000 available in both regimes
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              TDS limit for senior citizens doubled to ₹1 lakh
            </li>
          </ul>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center mt-8">
        Source: Union Budget 2025-26 Announcements
      </div>
    </div>
  );
};

// Update the interface to accept string values
interface IncomeDetails {
  salaryIncome: string;
  otherIncome: string;
  rentalIncome: string;
  homeLoanInterest: string;
}

export default IncomeTaxCalculator; 