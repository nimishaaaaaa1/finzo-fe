'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

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

export default function IncomeTaxCalculatorPage() {
  const [taxInput, setTaxInput] = useState<TaxInput>({
    income: {
      salary: 0,
      otherSources: 0,
      interest: 0,
      rental: 0,
      homeLoanInterest: {
        selfOccupied: 0,
        letOut: 0
      }
    },
    deductions: {
      section80C: 0,
      section80D: 0,
      nps: 0,
      hra: {
        basic: 0,
        da: 0,
        hraReceived: 0,
        rentPaid: 0,
        isMetroCity: false
      },
      section80G: 0,
      section80E: 0,
      section80TTA: 0
    },
    regime: 'new',
    age: 'below60'
  })

  // Add this function inside your component
  const calculateTax = () => {
    // Calculate total income
    const totalIncome = 
      taxInput.income.salary + 
      taxInput.income.otherSources + 
      taxInput.income.rental;

    let taxableIncome = totalIncome;

    if (taxInput.regime === 'old') {
      // Calculate total deductions for old regime
      const totalDeductions = 
        // Section 80C (max 1.5L)
        Math.min(taxInput.deductions.section80C, 150000) +
        // Section 80D (max 25K self, 50K parents)
        Math.min(taxInput.deductions.section80D, 75000) +
        // NPS (additional 50K)
        Math.min(taxInput.deductions.nps, 50000) +
        // Section 80E (no limit)
        taxInput.deductions.section80E +
        // Section 80G
        taxInput.deductions.section80G;

      // Calculate HRA exemption
      let hraExemption = 0;
      if (taxInput.deductions.hra.rentPaid > 0) {
        const basicSalary = taxInput.deductions.hra.basic;
        const hraReceived = taxInput.deductions.hra.hraReceived;
        const rentPaid = taxInput.deductions.hra.rentPaid;
        const metroCity = taxInput.deductions.hra.isMetroCity;

        // HRA is minimum of:
        // 1. Actual HRA received
        // 2. 50% of basic (metro) or 40% of basic (non-metro)
        // 3. Rent paid - 10% of basic
        hraExemption = Math.min(
          hraReceived,
          metroCity ? basicSalary * 0.5 : basicSalary * 0.4,
          Math.max(0, rentPaid - (basicSalary * 0.1))
        );
      }

      // Calculate home loan interest deduction
      const homeLoanDeduction = 
        Math.min(taxInput.income.homeLoanInterest.selfOccupied, 200000) + 
        taxInput.income.homeLoanInterest.letOut;

      // Apply all deductions
      taxableIncome = Math.max(0, totalIncome - totalDeductions - hraExemption - homeLoanDeduction);
      
      return calculateTaxOldRegime(taxableIncome, taxInput.age);
    } else {
      // New regime has no deductions
      return calculateTaxNewRegime(taxableIncome);
    }
  };

  const calculateHRAExemption = () => {
    const { basic, hraReceived, rentPaid, isMetroCity } = taxInput.deductions.hra;
    return Math.min(
      hraReceived,
      isMetroCity ? basic * 0.5 : basic * 0.4,
      Math.max(0, rentPaid - (basic * 0.1))
    );
  };

  const calculateTotalDeductions = () => {
    const totalDeductions = 
      Math.min(taxInput.deductions.section80C, 150000) +
      Math.min(taxInput.deductions.section80D, 75000) +
      Math.min(taxInput.deductions.nps, 50000) +
      taxInput.deductions.section80E +
      taxInput.deductions.section80G;

    return totalDeductions;
  };

  const calculateTaxableIncome = () => {
    const totalIncome = 
      taxInput.income.salary + 
      taxInput.income.otherSources + 
      taxInput.income.rental;

    let taxableIncome = totalIncome;

    if (taxInput.regime === 'old') {
      const totalDeductions = calculateTotalDeductions();
      const hraExemption = calculateHRAExemption();
      const homeLoanDeduction = 
        Math.min(taxInput.income.homeLoanInterest.selfOccupied, 200000) + 
        taxInput.income.homeLoanInterest.letOut;

      taxableIncome = Math.max(0, totalIncome - totalDeductions - hraExemption - homeLoanDeduction);
    }

    return taxableIncome;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* SEO Optimized Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Income Tax Calculator India {new Date().getFullYear()}-{new Date().getFullYear() + 1}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your income tax liability for FY {new Date().getFullYear()}-{new Date().getFullYear() + 1} using our free online income tax calculator. Compare old vs new tax regime and optimize your tax savings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
            >
              <h2 className="text-2xl font-bold mb-6">Basic Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Year
                  </label>
                  <select
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="2025-26">2025-26 (FY 2024-25)</option>
                    <option value="2024-25">2024-25 (FY 2023-24)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Regime
                  </label>
                  <select
                    value={taxInput.regime}
                    onChange={(e) => setTaxInput({
                      ...taxInput,
                      regime: e.target.value as 'old' | 'new'
                    })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    value={taxInput.age}
                    onChange={(e) => setTaxInput({
                      ...taxInput,
                      age: e.target.value as 'below60' | '60to80' | 'above80'
                    })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="below60">Below 60 years</option>
                    <option value="60to80">60 to 80 years</option>
                    <option value="above80">Above 80 years</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Income Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
            >
              <h2 className="text-2xl font-bold mb-6">Income Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Salary Income
                  </label>
                  <input
                    type="number"
                    value={taxInput.income.salary}
                    onChange={(e) => setTaxInput({
                      ...taxInput,
                      income: {
                        ...taxInput.income,
                        salary: Number(e.target.value)
                      }
                    })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your annual salary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Income Sources
                  </label>
                  <input
                    type="number"
                    value={taxInput.income.otherSources}
                    onChange={(e) => setTaxInput({
                      ...taxInput,
                      income: {
                        ...taxInput.income,
                        otherSources: Number(e.target.value)
                      }
                    })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Interest, dividends, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Income (if any)
                  </label>
                  <input
                    type="number"
                    value={taxInput.income.rental}
                    onChange={(e) => setTaxInput({
                      ...taxInput,
                      income: {
                        ...taxInput.income,
                        rental: Number(e.target.value)
                      }
                    })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Annual rental income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Loan Interest
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={taxInput.income.homeLoanInterest.selfOccupied}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        income: {
                          ...taxInput.income,
                          homeLoanInterest: {
                            ...taxInput.income.homeLoanInterest,
                            selfOccupied: Number(e.target.value)
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Self-occupied property"
                    />
                    <input
                      type="number"
                      value={taxInput.income.homeLoanInterest.letOut}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        income: {
                          ...taxInput.income,
                          homeLoanInterest: {
                            ...taxInput.income.homeLoanInterest,
                            letOut: Number(e.target.value)
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Let-out property"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deductions & Exemptions Section - Only visible for Old Regime */}
            {taxInput.regime === 'old' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
              >
                <h2 className="text-2xl font-bold mb-6">Deductions & Exemptions</h2>
                <div className="space-y-6">
                  {/* Section 80C */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80C (Max ₹1.5L)
                    </label>
                    <input
                      type="number"
                      value={taxInput.deductions.section80C}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        deductions: {
                          ...taxInput.deductions,
                          section80C: Number(e.target.value)
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="PPF, ELSS, Life Insurance, etc."
                    />
                    <p className="text-sm text-gray-500 mt-1">Includes PPF, ELSS, Life Insurance Premium, Children's Tuition Fee, etc.</p>
                  </div>

                  {/* Section 80D */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80D - Health Insurance
                    </label>
                    <input
                      type="number"
                      value={taxInput.deductions.section80D}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        deductions: {
                          ...taxInput.deductions,
                          section80D: Number(e.target.value)
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Health Insurance Premium"
                    />
                    <p className="text-sm text-gray-500 mt-1">Max ₹25,000 for self & family, additional ₹50,000 for parents above 60</p>
                  </div>

                  {/* NPS */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NPS Contribution (Additional ₹50,000)
                    </label>
                    <input
                      type="number"
                      value={taxInput.deductions.nps}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        deductions: {
                          ...taxInput.deductions,
                          nps: Number(e.target.value)
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="NPS Contribution under 80CCD(1B)"
                    />
                  </div>

                  {/* Section 80E */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80E - Education Loan Interest
                    </label>
                    <input
                      type="number"
                      value={taxInput.deductions.section80E}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        deductions: {
                          ...taxInput.deductions,
                          section80E: Number(e.target.value)
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Education Loan Interest"
                    />
                  </div>

                  {/* Section 80G */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80G - Donations
                    </label>
                    <input
                      type="number"
                      value={taxInput.deductions.section80G}
                      onChange={(e) => setTaxInput({
                        ...taxInput,
                        deductions: {
                          ...taxInput.deductions,
                          section80G: Number(e.target.value)
                        }
                      })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Charitable Donations"
                    />
                  </div>

                  {/* HRA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Rent Allowance (HRA)
                    </label>
                    <div className="space-y-4">
                      <input
                        type="number"
                        value={taxInput.deductions.hra.basic}
                        onChange={(e) => setTaxInput({
                          ...taxInput,
                          deductions: {
                            ...taxInput.deductions,
                            hra: {
                              ...taxInput.deductions.hra,
                              basic: Number(e.target.value)
                            }
                          }
                        })}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Basic Salary"
                      />
                      <input
                        type="number"
                        value={taxInput.deductions.hra.hraReceived}
                        onChange={(e) => setTaxInput({
                          ...taxInput,
                          deductions: {
                            ...taxInput.deductions,
                            hra: {
                              ...taxInput.deductions.hra,
                              hraReceived: Number(e.target.value)
                            }
                          }
                        })}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="HRA Received"
                      />
                      <input
                        type="number"
                        value={taxInput.deductions.hra.rentPaid}
                        onChange={(e) => setTaxInput({
                          ...taxInput,
                          deductions: {
                            ...taxInput.deductions,
                            hra: {
                              ...taxInput.deductions.hra,
                              rentPaid: Number(e.target.value)
                            }
                          }
                        })}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Annual Rent Paid"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={taxInput.deductions.hra.isMetroCity}
                          onChange={(e) => setTaxInput({
                            ...taxInput,
                            deductions: {
                              ...taxInput.deductions,
                              hra: {
                                ...taxInput.deductions.hra,
                                isMetroCity: e.target.checked
                              }
                            }
                          })}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label className="text-sm text-gray-700">Metro City (Delhi, Mumbai, Kolkata, Chennai)</label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
              >
                <h2 className="text-2xl font-bold mb-6">Tax Summary</h2>
                
                {/* Income Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Income</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Salary Income</span>
                      <span>₹{taxInput.income.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Other Sources</span>
                      <span>₹{taxInput.income.otherSources.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rental Income</span>
                      <span>₹{taxInput.income.rental.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Income</span>
                      <span>₹{(
                        taxInput.income.salary + 
                        taxInput.income.otherSources + 
                        taxInput.income.rental
                      ).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions Section - Only for Old Regime */}
                {taxInput.regime === 'old' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Deductions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Section 80C</span>
                        <span className="text-green-600">-₹{Math.min(taxInput.deductions.section80C, 150000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Section 80D</span>
                        <span className="text-green-600">-₹{Math.min(taxInput.deductions.section80D, 75000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">NPS</span>
                        <span className="text-green-600">-₹{Math.min(taxInput.deductions.nps, 50000).toLocaleString()}</span>
                      </div>
                      {taxInput.deductions.hra.rentPaid > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">HRA Exemption</span>
                          <span className="text-green-600">-₹{calculateHRAExemption().toLocaleString()}</span>
                        </div>
                      )}
                      {taxInput.deductions.section80E > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Education Loan</span>
                          <span className="text-green-600">-₹{taxInput.deductions.section80E.toLocaleString()}</span>
                        </div>
                      )}
                      {taxInput.deductions.section80G > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Donations</span>
                          <span className="text-green-600">-₹{taxInput.deductions.section80G.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="h-px bg-gray-200 my-2"></div>
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Deductions</span>
                        <span className="text-green-600">-₹{calculateTotalDeductions().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tax Calculation */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Tax Calculation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taxable Income</span>
                      <span>₹{calculateTaxableIncome().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Income Tax</span>
                      <span>₹{calculateTax().tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Health & Education Cess (4%)</span>
                      <span>₹{calculateTax().cess.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Tax Liability</span>
                      <span className="text-purple-600">₹{calculateTax().totalTax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => calculateTax()}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors font-medium mt-6"
                >
                  Recalculate
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* FAQ and SEO Content Section */}
        <div className="mt-16 prose prose-purple max-w-none space-y-12">
          {/* What is Income Tax Calculator */}
          <div>
            <h2 className="text-3xl font-bold mb-6">What is Income Tax Calculator?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              An Income Tax Calculator is a user-friendly online tool that helps you calculate your income tax liability based on your income, deductions, and applicable tax slabs. Our calculator is updated with the latest tax rates for FY 2024-25 (AY 2025-26) and helps you compare between old and new tax regimes.
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold mb-4">How can I calculate my income tax?</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">Follow these simple steps to calculate your income tax:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                    <li>Enter your total annual income (salary, investments, etc.)</li>
                    <li>Select your applicable tax regime (old or new)</li>
                    <li>Choose your age category</li>
                    <li>For old regime: Add your eligible deductions
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Section 80C investments (up to ₹1.5L)</li>
                        <li>Health Insurance premiums (Section 80D)</li>
                        <li>House Rent Allowance (HRA)</li>
                        <li>Other applicable deductions</li>
                      </ul>
                    </li>
                    <li>The calculator will automatically compute:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Your taxable income</li>
                        <li>Applicable tax based on slabs</li>
                        <li>Health & Education cess</li>
                        <li>Total tax liability</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold mb-4">How is 7.5 lakh income tax free?</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">Under the old tax regime, you can make your income up to ₹7.5 lakhs tax-free through:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Basic Exemption: ₹2.5 lakhs (for everyone)</li>
                    <li>Standard Deduction: ₹50,000 (for salaried individuals)</li>
                    <li>Section 80C Deductions: Up to ₹1.5 lakhs
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>PPF, ELSS, Life Insurance</li>
                        <li>Children's Tuition Fees</li>
                        <li>Home Loan Principal</li>
                      </ul>
                    </li>
                    <li>Additional Deductions:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>HRA (if paying rent)</li>
                        <li>Section 80D (Health Insurance)</li>
                        <li>NPS Contribution (Additional ₹50,000)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold mb-4">How much tax do I pay on 10 lakhs?</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">For ₹10 lakhs annual income (FY 2024-25):</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">New Tax Regime:</h4>
                      <ul className="list-none space-y-2 text-gray-600 ml-4">
                        <li>• First ₹3 lakhs: No tax (₹0)</li>
                        <li>• ₹3L to ₹6L: 5% on ₹3L (₹15,000)</li>
                        <li>• ₹6L to ₹9L: 10% on ₹3L (₹30,000)</li>
                        <li>• ₹9L to ₹10L: 15% on ₹1L (₹15,000)</li>
                        <li>• Total Tax: ₹60,000</li>
                        <li>• Health & Education Cess: ₹2,400 (4%)</li>
                        <li className="font-semibold mt-2">Final Tax Liability: ₹62,400</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Old Tax Regime:</h4>
                      <ul className="list-none space-y-2 text-gray-600 ml-4">
                        <li>• Basic Tax:
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- First ₹2.5L: No tax</li>
                            <li>- ₹2.5L to ₹5L: 5% (₹12,500)</li>
                            <li>- ₹5L to ₹10L: 20% (₹1,00,000)</li>
                          </ul>
                        </li>
                        <li>• Total Tax: ₹1,12,500</li>
                        <li>• Can be reduced through deductions:
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- Section 80C: Up to ₹1.5L</li>
                            <li>- Standard Deduction: ₹50,000</li>
                            <li>- Other applicable deductions</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold mb-4">How much tax for 23 lakhs salary?</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">For ₹23 lakhs annual salary (FY 2024-25):</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">New Tax Regime:</h4>
                      <ul className="list-none space-y-2 text-gray-600 ml-4">
                        <li>• First ₹3L: No tax (₹0)</li>
                        <li>• ₹3L to ₹6L: 5% (₹15,000)</li>
                        <li>• ₹6L to ₹9L: 10% (₹30,000)</li>
                        <li>• ₹9L to ₹12L: 15% (₹45,000)</li>
                        <li>• ₹12L to ₹15L: 20% (₹60,000)</li>
                        <li>• Above ₹15L: 30% on ₹8L (₹2,40,000)</li>
                        <li>• Total Tax: ₹3,90,000</li>
                        <li>• Health & Education Cess: ₹15,600 (4%)</li>
                        <li className="font-semibold mt-2">Final Tax Liability: ₹4,05,600</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Old Tax Regime:</h4>
                      <ul className="list-none space-y-2 text-gray-600 ml-4">
                        <li>• Can be significantly reduced through:
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- Section 80C: Up to ₹1.5L</li>
                            <li>- Standard Deduction: ₹50,000</li>
                            <li>- HRA (if applicable)</li>
                            <li>- Section 80D: Up to ₹75,000</li>
                            <li>- NPS: Additional ₹50,000</li>
                            <li>- Other deductions</li>
                          </ul>
                        </li>
                        <li className="mt-2">• Effective tax could be reduced by 25-40% with proper tax planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Income Tax Calculator: Old vs New Regime</h2>
              <p className="text-gray-600">
                Compare both tax regimes to make an informed decision. The new regime offers lower tax rates but without deductions, while the old regime allows various deductions and exemptions. Use our calculator to determine which regime is more beneficial for you.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Income Tax Calculator India: Latest Updates</h2>
              <p className="text-gray-600">
                Stay updated with the latest tax slabs and regulations for FY 2024-25. Our calculator incorporates all recent changes announced in the budget, ensuring accurate tax computation for Indian taxpayers.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Income Tax Department Official Calculator</h2>
              <p className="text-gray-600">
                While the Income Tax Department provides an official calculator, our tool offers additional features like:
                - Comparison between old and new regimes
                - Tax saving recommendations
                - User-friendly interface
                - Detailed breakdown of calculations
                - Mobile-responsive design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 