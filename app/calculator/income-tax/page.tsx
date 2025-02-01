'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Use dynamic import to avoid hydration issues
const IncomeTaxCalculator = dynamic(
  () => import('../../components/calculators/IncomeTaxCalculator'),
  { 
    ssr: false,
    loading: () => <div>Loading calculator...</div>
  }
);

interface TaxInput {
  income: {
    salary: number
    otherSources: number
    interest: number
    rental: number
    homeLoanInterest: {
      selfOccupied: number
      letOut: number
    }
  }
  deductions: {
    section80C: number
    section80D: number
    nps: number
    hra: {
      basic: number
      da: number
      hraReceived: number
      rentPaid: number
      isMetroCity: boolean
    }
    section80G: number
    section80E: number
    section80TTA: number
  }
  regime: 'old' | 'new'
  age: 'below40' | 'below60' | '60to80' | 'above80'
}

// Add these utility functions at the top of the file, before the component
const calculateTaxOldRegime = (income: number, age: string) => {
  let tax = 0;

  if (age === 'below60') {
    if (income <= 250000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      tax = 12500 + (income - 500000) * 0.2;
    } else {
      tax = 112500 + (income - 1000000) * 0.3;
    }
  } else if (age === '60to80') {
    // Different slabs for senior citizens
    if (income <= 300000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 300000) * 0.05;
    } else if (income <= 1000000) {
      tax = 10000 + (income - 500000) * 0.2;
    } else {
      tax = 110000 + (income - 1000000) * 0.3;
    }
  } else if (age === 'above80') {
    // Different slabs for super senior citizens
    if (income <= 500000) {
      tax = 0;
    } else if (income <= 1000000) {
      tax = (income - 500000) * 0.2;
    } else {
      tax = 100000 + (income - 1000000) * 0.3;
    }
  }

  const cess = tax * 0.04; // 4% cess
  return {
    tax,
    cess,
    totalTax: tax + cess
  };
};

const calculateTaxNewRegime = (income: number) => {
  let tax = 0;

  if (income <= 300000) {
    tax = 0;
  } else if (income <= 600000) {
    tax = (income - 300000) * 0.05;
  } else if (income <= 900000) {
    tax = 15000 + (income - 600000) * 0.1;
  } else if (income <= 1200000) {
    tax = 45000 + (income - 900000) * 0.15;
  } else if (income <= 1500000) {
    tax = 90000 + (income - 1200000) * 0.2;
  } else {
    tax = 150000 + (income - 1500000) * 0.3;
  }

  const cess = tax * 0.04; // 4% cess
  return {
    tax,
    cess,
    totalTax: tax + cess
  };
};

function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Income Tax Calculator India 2025-2026</h1>
        <p className="text-gray-600">
          Calculate your income tax liability for FY 2025-2026 using our free online income tax calculator. 
          Compare old vs new tax regime and optimize your tax savings with the latest Budget 2025 updates.
        </p>
      </div>

      <IncomeTaxCalculator />

      {/* Information Sections */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is Income Tax Calculator?</h2>
          <p className="text-gray-600">
            An Income Tax Calculator is a user-friendly online tool that helps you calculate your income tax liability 
            based on your income, deductions, and applicable tax slabs. Our calculator is updated with the latest 
            Budget 2025 tax rates and helps you compare between old and new tax regimes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Tax Updates from Budget 2025</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Key Changes</h3>
            <ul className="space-y-2">
              <li>• Zero tax up to ₹12 lakh income under new tax regime</li>
              <li>• Standard deduction of ₹75,000 for salaried individuals</li>
              <li>• New 25% tax slab for income between ₹20-24 lakh</li>
              <li>• 30% tax rate now applies only above ₹24 lakh</li>
              <li>• Employer's NPS contribution (up to 14% of basic) allowed as deduction</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">New Tax Regime Slabs (2025-26)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Income Slab</th>
                  <th className="px-6 py-3 text-left">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-6 py-4">Up to ₹4 lakh</td><td className="px-6 py-4">Nil</td></tr>
                <tr><td className="px-6 py-4">₹4-8 lakh</td><td className="px-6 py-4">5%</td></tr>
                <tr><td className="px-6 py-4">₹8-12 lakh</td><td className="px-6 py-4">10%</td></tr>
                <tr><td className="px-6 py-4">₹12-16 lakh</td><td className="px-6 py-4">15%</td></tr>
                <tr><td className="px-6 py-4">₹16-20 lakh</td><td className="px-6 py-4">20%</td></tr>
                <tr><td className="px-6 py-4">₹20-24 lakh</td><td className="px-6 py-4">25%</td></tr>
                <tr><td className="px-6 py-4">Above ₹24 lakh</td><td className="px-6 py-4">30%</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How can I calculate my income tax?</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Enter your total annual income (salary, investments, etc.)</li>
                <li>Select your applicable tax regime (old or new)</li>
                <li>Choose your age category</li>
                <li>Add eligible deductions (for old regime)</li>
                <li>View your calculated tax liability</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How is income up to ₹12 lakh tax-free?</h3>
              <p className="text-gray-600">
                Under the new tax regime announced in Budget 2025:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Basic exemption up to ₹4 lakh</li>
                <li>Concessional rates up to ₹12 lakh</li>
                <li>Standard deduction of ₹75,000 for salaried individuals</li>
                <li>Tax rebate under Section 87A</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What are the major changes in Budget 2025?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enhanced basic exemption limit</li>
                <li>Introduction of new 25% tax slab</li>
                <li>Revised 30% tax threshold</li>
                <li>Standard deduction benefits</li>
                <li>NPS contribution benefits</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Income Tax Calculator: Old vs New Regime</h2>
          <p className="text-gray-600">
            Compare both tax regimes to make an informed decision. The new regime offers lower tax rates but without 
            most deductions, while the old regime allows various deductions and exemptions. Use our calculator to 
            determine which regime is more beneficial for you based on the latest Budget 2025 changes.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Page; 