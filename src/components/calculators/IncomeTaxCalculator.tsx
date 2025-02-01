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
  const [employmentType, setEmploymentType] = useState<'salaried' | 'pensioner' | 'business'>('salaried');
  const isSalaried = employmentType === 'salaried';
  const isPensioner = employmentType === 'pensioner';

  // Update the tax slabs with correct rates and ranges
  const newRegimeSlabs = [
    { min: 0, max: 1200000, rate: 0 },          // No tax up to ₹12L
    { min: 1200001, max: 1500000, rate: 0.10 }, // 10% for ₹12L-₹15L
    { min: 1500001, max: 2000000, rate: 0.15 }, // 15% for ₹15L-₹20L
    { min: 2000001, max: 3000000, rate: 0.20 }, // 20% for ₹20L-₹30L
    { min: 3000001, max: Infinity, rate: 0.30 }  // 30% above ₹30L
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
    let tax = 0;
    let remainingIncome = calculateTotalIncome();
    
    // Apply standard deduction for salaried/pensioners
    const standardDeduction = (isSalaried || isPensioner) ? 75000 : 0;
    const taxableIncome = Math.max(0, remainingIncome - standardDeduction);

    // No tax if income within limits
    if ((isSalaried || isPensioner) && remainingIncome <= 1275000) {
      return {
        taxableIncome,
        standardDeduction,
        tax: 0,
        cess: 0,
        totalTax: 0
      };
    }

    // Calculate tax slab-wise
    for (const slab of newRegimeSlabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
        tax += taxableAmount * slab.rate;
      } else {
        break;
      }
    }

    const cess = tax * 0.04; // 4% cess

    return {
      taxableIncome,
      standardDeduction,
      tax,
      cess,
      totalTax: tax + cess
    };
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
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value as 'salaried' | 'pensioner' | 'business')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="salaried">Salaried</option>
            <option value="pensioner">Pensioner</option>
            <option value="business">Business/Self-Employed</option>
          </select>
          {employmentType === 'business' && regime === 'new' && (
            <p className="text-sm text-amber-600 mt-1">
              Note:  is not applicable for business income
            </p>
          )}
        </div>

        {/* Tax Calculation Result */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Tax Summary (FY 2025-26)</h3>
          <div className="space-y-2">
            {/* Income Section */}
            <h4 className="font-medium">Income</h4>
            <div className="flex justify-between">
              <span>Salary Income</span>
              <span>₹{Number(incomeDetails.salaryIncome || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Sources</span>
              <span>₹{Number(incomeDetails.otherIncome || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Rental Income</span>
              <span>₹{Number(incomeDetails.rentalIncome || 0).toLocaleString()}</span>
            </div>
            
            {/* Deductions Section - Updated  amount */}
            <div className="h-px bg-gray-200 my-2"></div>
            <h4 className="font-medium">Deductions</h4>
            {(isSalaried || isPensioner) && (
              <div className="flex justify-between text-green-600">
                <span></span>
                <span>- ₹75,000</span>
              </div>
            )}

            {/* Tax Calculation */}
            <div className="h-px bg-gray-200 my-2"></div>
            <h4 className="font-medium">Tax Calculation</h4>
            <div className="flex justify-between">
              <span>Taxable Income</span>
              <span>₹{calculateTax().taxableIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Income Tax</span>
              <span>₹{calculateTax().tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Health & Education Cess (4%)</span>
              <span>₹{calculateTax().cess.toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total Tax Liability</span>
              <span className="text-purple-600">₹{calculateTax().totalTax.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Budget 2025  Updates</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              ₹75,000  for salaried/pensioners
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">!</span>
              Not applicable for business/self-employed income
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Effectively no tax up to ₹12.75L for salaried (new regime)
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