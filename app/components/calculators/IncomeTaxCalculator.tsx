'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TaxResult {
  taxableIncome: number;
  totalTax: number;
  cess: number;
  effectiveRate: number;
  slabwiseBreakup: {
    slab: string;
    rate: string;
    amount: number;
    tax: number;
  }[];
}

interface IncomeDetails {
  salary: string;
  otherSources: string;
  rental: string;
  homeLoanInterest: string;
}

export default function IncomeTaxCalculator() {
  const [result, setResult] = useState<TaxResult | null>(null);
  const [formData, setFormData] = useState({
    assessmentYear: '2025-26',
    regime: 'new',
    ageGroup: '0-60',
    income: {
      salary: '',
      otherSources: '',
      rental: '',
      homeLoanInterest: ''
    }
  });

  // Add this helper function for Indian number formatting
  const formatIndianNumber = (num: number): string => {
    const formatted = num.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'decimal'
    });
    return `₹${formatted}`;
  };

  // Update the formatCurrency function
  const formatCurrency = (value: string) => {
    // Remove all non-digit characters
    const number = value.replace(/[^\d]/g, '');
    // Format with commas for Indian numbering system
    const lastThree = number.substring(number.length - 3);
    const otherNumbers = number.substring(0, number.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + 
      (otherNumbers ? "," : "") + lastThree;
    return formatted;
  };

  const handleIncomeChange = (field: keyof IncomeDetails, value: string) => {
    // Remove commas and format
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue === '' || /^\d+$/.test(cleanValue)) {
      setFormData(prev => ({
        ...prev,
        income: {
          ...prev.income,
          [field]: formatCurrency(cleanValue)
        }
      }));
    }
  };

  const calculateTax = () => {
    // Convert string values to numbers and remove commas
    const totalIncome = Number(formData.income.salary.replace(/,/g, '')) + 
                       Number(formData.income.otherSources.replace(/,/g, '')) + 
                       Number(formData.income.rental.replace(/,/g, ''));

    // Standard deduction for salaried individuals
    let deductions = 0;
    if (Number(formData.income.salary.replace(/,/g, '')) > 0) {
      deductions = 75000;
    }

    const taxableIncome = Math.max(0, totalIncome - deductions);
    let tax = 0;
    let slabwiseBreakup = [];

    if (formData.regime === 'new') {
      // First 4L - 0%
      const slab1Amount = Math.min(taxableIncome, 400000);
      slabwiseBreakup.push({
        slab: "₹0 to ₹4,00,000",
        rate: "0%",
        amount: slab1Amount,
        tax: 0
      });

      // 4L to 8L - 5%
      if (taxableIncome > 400000) {
        const slab2Amount = Math.min(taxableIncome - 400000, 400000);
        const slab2Tax = slab2Amount * 0.05;
        tax += slab2Tax;
        slabwiseBreakup.push({
          slab: "₹4,00,001 to ₹8,00,000",
          rate: "5%",
          amount: slab2Amount,
          tax: slab2Tax
        });
      }

      // 8L to 12L - 10%
      if (taxableIncome > 800000) {
        const slab3Amount = Math.min(taxableIncome - 800000, 400000);
        const slab3Tax = slab3Amount * 0.10;
        tax += slab3Tax;
        slabwiseBreakup.push({
          slab: "₹8,00,001 to ₹12,00,000",
          rate: "10%",
          amount: slab3Amount,
          tax: slab3Tax
        });
      }

      // 12L to 16L - 15%
      if (taxableIncome > 1200000) {
        const slab4Amount = Math.min(taxableIncome - 1200000, 400000);
        const slab4Tax = slab4Amount * 0.15;
        tax += slab4Tax;
        slabwiseBreakup.push({
          slab: "₹12,00,001 to ₹16,00,000",
          rate: "15%",
          amount: slab4Amount,
          tax: slab4Tax
        });
      }

      // Remove other slabs as they're not needed for this example
    } else {
      // Old Tax Regime Slabs
      if (taxableIncome > 1000000) {
        const amount = taxableIncome - 1000000;
        tax += amount * 0.30;
        slabwiseBreakup.push({
          slab: "Above ₹10,00,000",
          rate: "30%",
          amount: amount,
          tax: amount * 0.30
        });
      }
      // Add more slabs...
    }

    const cess = Math.round(tax * 0.04); // 4% Health & Education Cess, rounded to nearest rupee
    const totalTax = tax + cess;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;

    setResult({
      taxableIncome,
      totalTax,
      cess,
      effectiveRate,
      slabwiseBreakup
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Input Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Assessment Year
                </label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.assessmentYear}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    assessmentYear: e.target.value
                  }))}
                >
                  <option value="2025-26">2025-26 (FY 2024-25)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tax Regime
                </label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.regime}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    regime: e.target.value as 'new' | 'old'
                  }))}
                >
                  <option value="new">New Tax Regime</option>
                  <option value="old">Old Tax Regime</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Age Category
                </label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.ageGroup}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ageGroup: e.target.value
                  }))}
                >
                  <option value="0-60">Below 60 years</option>
                  <option value="60-80">60 to 80 years</option>
                  <option value="80+">Above 80 years</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Income Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Salary Income
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="0"
                    value={formData.income.salary}
                    onChange={(e) => handleIncomeChange('salary', e.target.value)}
                    className="pl-7 pr-3 text-left font-mono block w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Income Sources
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="0"
                    value={formData.income.otherSources}
                    onChange={(e) => handleIncomeChange('otherSources', e.target.value)}
                    className="pl-7 pr-3 text-left font-mono block w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Income
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="0"
                    value={formData.income.rental}
                    onChange={(e) => handleIncomeChange('rental', e.target.value)}
                    className="pl-7 pr-3 text-left font-mono block w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Tax Summary */}
        <Card className="p-6 h-fit sticky top-6">
          <h2 className="text-xl font-semibold mb-6">Tax Summary</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-3">Income Breakup</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Salary Income</span>
                  <span className="font-mono">{formatIndianNumber(Number(formData.income.salary.replace(/,/g, '')) || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Other Sources</span>
                  <span className="font-mono">{formatIndianNumber(Number(formData.income.otherSources.replace(/,/g, '')) || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rental Income</span>
                  <span className="font-mono">{formatIndianNumber(Number(formData.income.rental.replace(/,/g, '')) || 0)}</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="flex justify-between items-center font-medium">
                    <span>Gross Total Income</span>
                    <span className="font-mono">{formatIndianNumber(Number(formData.income.salary.replace(/,/g, '')) + Number(formData.income.otherSources.replace(/,/g, '')) + Number(formData.income.rental.replace(/,/g, '')))}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium mb-3">Deductions</h3>
              {Number(formData.income.salary.replace(/,/g, '')) > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Standard Deduction</span>
                  <span className="font-mono">- ₹75,000</span>
                </div>
              )}
            </div>

            {result && (
              <>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Tax Calculation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taxable Income</span>
                      <span className="font-mono">{formatIndianNumber(result.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Income Tax</span>
                      <span className="font-mono">{formatIndianNumber(result.totalTax - result.cess)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Health & Education Cess (4%)</span>
                      <span className="font-mono">{formatIndianNumber(result.cess)}</span>
                    </div>
                    <div className="border-t border-blue-200 mt-2 pt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total Tax Liability</span>
                        <span className="font-mono text-blue-600">{formatIndianNumber(result.totalTax)}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 text-right">
                        Effective Tax Rate: {result.effectiveRate.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>

                {result.slabwiseBreakup.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Slab-wise Breakup</h3>
                    <div className="space-y-2">
                      {result.slabwiseBreakup.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 text-sm">
                          <span className="text-gray-600 col-span-2">{item.slab}</span>
                          <span className="text-left">{item.rate}</span>
                          <span className="font-mono text-right">{formatIndianNumber(item.tax)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <Button 
              onClick={calculateTax}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2"
            >
              Calculate Tax
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 