'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IncomeDetails {
  salaryIncome: number;
  otherIncome: number;
  rentalIncome: number;
  homeLoanInterest: number;
}

const IncomeTaxCalculator = () => {
  // Basic Details State
  const [assessmentYear, setAssessmentYear] = useState<string>('2025-26');
  const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');
  const [ageCategory, setAgeCategory] = useState<'below60' | '60to80' | 'above80'>('below60');

  // Income Details State
  const [incomeDetails, setIncomeDetails] = useState<IncomeDetails>({
    salaryIncome: 0,
    otherIncome: 0,
    rentalIncome: 0,
    homeLoanInterest: 0
  });

  // Tax Calculation State
  const [taxSummary, setTaxSummary] = useState({
    totalIncome: 0,
    taxableIncome: 0,
    incomeTax: 0,
    cess: 0,
    totalTaxLiability: 0
  });

  // Calculate total income
  const calculateTotalIncome = () => {
    return (
      incomeDetails.salaryIncome +
      incomeDetails.otherIncome +
      incomeDetails.rentalIncome
    );
  };

  // Calculate taxable income (with standard deduction for salary)
  const calculateTaxableIncome = (totalIncome: number) => {
    let taxableIncome = totalIncome;
    
    if (incomeDetails.salaryIncome > 0) {
      taxableIncome -= 75000; // Standard deduction
    }
    
    if (taxRegime === 'old') {
      taxableIncome -= Math.min(incomeDetails.homeLoanInterest, 200000); // Home loan interest deduction
    }
    
    return Math.max(0, taxableIncome);
  };

  // Calculate tax based on slabs
  const calculateTax = (taxableIncome: number) => {
    const newRegimeSlabs = [
      { min: 0, max: 400000, rate: 0 },
      { min: 400000, max: 800000, rate: 5 },
      { min: 800000, max: 1200000, rate: 10 },
      { min: 1200000, max: 1600000, rate: 15 },
      { min: 1600000, max: 2000000, rate: 20 },
      { min: 2000000, max: 2400000, rate: 25 },
      { min: 2400000, max: Infinity, rate: 30 }
    ];

    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const slab of newRegimeSlabs) {
      if (remainingIncome > 0) {
        const taxableInSlab = Math.min(remainingIncome, slab.max - slab.min);
        tax += (taxableInSlab * slab.rate) / 100;
        remainingIncome -= taxableInSlab;
      }
    }

    // Apply rebate under section 87A
    if (taxableIncome <= 1200000) {
      tax = 0;
    }

    return tax;
  };

  // Recalculate tax on input change
  const handleRecalculate = () => {
    const totalIncome = calculateTotalIncome();
    const taxableIncome = calculateTaxableIncome(totalIncome);
    const incomeTax = calculateTax(taxableIncome);
    const cess = incomeTax * 0.04;

    setTaxSummary({
      totalIncome,
      taxableIncome,
      incomeTax,
      cess,
      totalTaxLiability: incomeTax + cess
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Input Fields */}
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Basic Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Year
              </label>
              <select
                value={assessmentYear}
                onChange={(e) => setAssessmentYear(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="2025-26">2025-26 (FY 2024-25)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Regime
              </label>
              <select
                value={taxRegime}
                onChange={(e) => setTaxRegime(e.target.value as 'new' | 'old')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="new">New Tax Regime</option>
                <option value="old">Old Tax Regime</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Category
              </label>
              <select
                value={ageCategory}
                onChange={(e) => setAgeCategory(e.target.value as 'below60' | '60to80' | 'above80')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="below60">Below 60 years</option>
                <option value="60to80">60 to 80 years</option>
                <option value="above80">Above 80 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Income Details */}
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
                  salaryIncome: Number(e.target.value)
                })}
                className="w-full p-2 border rounded-lg"
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
                  otherIncome: Number(e.target.value)
                })}
                className="w-full p-2 border rounded-lg"
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
                  rentalIncome: Number(e.target.value)
                })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {taxRegime === 'old' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Loan Interest
                </label>
                <input
                  type="number"
                  value={incomeDetails.homeLoanInterest}
                  onChange={(e) => setIncomeDetails({
                    ...incomeDetails,
                    homeLoanInterest: Number(e.target.value)
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Tax Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Tax Summary</h2>
        
        {/* Income Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Income</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Salary Income</span>
              <span>₹{incomeDetails.salaryIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Sources</span>
              <span>₹{incomeDetails.otherIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Rental Income</span>
              <span>₹{incomeDetails.rentalIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Income</span>
              <span>₹{taxSummary.totalIncome.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Tax Calculation */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tax Calculation</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Taxable Income</span>
              <span>₹{taxSummary.taxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Income Tax</span>
              <span>₹{taxSummary.incomeTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Health & Education Cess (4%)</span>
              <span>₹{taxSummary.cess.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total Tax Liability</span>
              <span className="text-blue-600">
                ₹{taxSummary.totalTaxLiability.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRecalculate}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator; 