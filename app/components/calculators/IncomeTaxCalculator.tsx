'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IncomeDetails {
  salaryIncome: string;
  otherIncome: string;
  rentalIncome: string;
  homeLoanInterest: string;
}

const IncomeTaxCalculator = () => {
  // Basic Details State
  const [assessmentYear, setAssessmentYear] = useState<string>('2025-26');
  const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');
  const [ageCategory, setAgeCategory] = useState<'below60' | '60to80' | 'above80'>('below60');

  // Income Details State
  const [incomeDetails, setIncomeDetails] = useState<IncomeDetails>({
    salaryIncome: '',
    otherIncome: '',
    rentalIncome: '',
    homeLoanInterest: ''
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
      Number(incomeDetails.salaryIncome) +
      Number(incomeDetails.otherIncome) +
      Number(incomeDetails.rentalIncome)
    );
  };

  // Calculate taxable income (with standard deduction for salary)
  const calculateTaxableIncome = (totalIncome: number) => {
    let taxableIncome = totalIncome;
    
    if (Number(incomeDetails.salaryIncome) > 0) {
      taxableIncome -= 75000; // Standard deduction
    }
    
    if (taxRegime === 'old') {
      taxableIncome -= Math.min(Number(incomeDetails.homeLoanInterest), 200000); // Home loan interest deduction
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
    <>
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
                <label htmlFor="salaryIncome" className="block text-gray-700 text-sm font-medium mb-2">
                  Annual Salary Income
                </label>
                <input
                  id="salaryIncome"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter annual salary"
                  value={incomeDetails.salaryIncome}
                  onChange={(e) => setIncomeDetails(prev => ({
                    ...prev,
                    salaryIncome: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="otherIncome" className="block text-gray-700 text-sm font-medium mb-2">
                  Other Income Sources
                </label>
                <input
                  id="otherIncome"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter other income"
                  value={incomeDetails.otherIncome}
                  onChange={(e) => setIncomeDetails(prev => ({
                    ...prev,
                    otherIncome: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="rentalIncome" className="block text-gray-700 text-sm font-medium mb-2">
                  Rental Income (if any)
                </label>
                <input
                  id="rentalIncome"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter rental income"
                  value={incomeDetails.rentalIncome}
                  onChange={(e) => setIncomeDetails(prev => ({
                    ...prev,
                    rentalIncome: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="homeLoanInterest" className="block text-gray-700 text-sm font-medium mb-2">
                  Home Loan Interest Paid
                </label>
                <input
                  id="homeLoanInterest"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter home loan interest paid"
                  value={incomeDetails.homeLoanInterest}
                  onChange={(e) => setIncomeDetails(prev => ({
                    ...prev,
                    homeLoanInterest: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Maximum deduction allowed: ₹2,00,000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tax Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Tax Summary</h2>
          
          <div className="space-y-6">
            {/* Income Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Income</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Salary Income</span>
                  <span>₹{Number(incomeDetails.salaryIncome || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Sources</span>
                  <span>₹{Number(incomeDetails.otherIncome || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rental Income</span>
                  <span>₹{Number(incomeDetails.rentalIncome || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Deductions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Standard Deduction</span>
                  <span className="text-green-600">
                    - ₹{(Number(incomeDetails.salaryIncome) > 0 ? 75000 : 0).toLocaleString('en-IN')}
                  </span>
                </div>
                {Number(incomeDetails.homeLoanInterest) > 0 && (
                  <div className="flex justify-between">
                    <span>Home Loan Interest</span>
                    <span className="text-green-600">
                      - ₹{Math.min(Number(incomeDetails.homeLoanInterest), 200000).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
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

            {/* Calculate Button */}
            <button
              onClick={handleRecalculate}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Calculate Tax
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeTaxCalculator; 