'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const GSTArticle = () => {
  return (
    <article className="prose max-w-none mb-8">
      <h1 className="text-3xl font-bold mb-4">GST Calculator: Calculate GST Tax in India</h1>
      
      <p className="mb-4">
        Calculate Goods and Services Tax (GST) easily with our free online GST calculator. Whether you're dealing with inclusive or exclusive GST rates of 3%, 5%, 12%, 18%, or 28%, our calculator helps you determine the exact tax amount and final price.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Understanding GST Rates in India</h2>
      
      <ul className="list-disc pl-6 mb-4">
        <li><strong>3% GST Rate:</strong> Applies to precious metals like gold, silver, and jewelry</li>
        <li><strong>5% GST Rate:</strong> Essential items and basic consumer goods</li>
        <li><strong>12% GST Rate:</strong> Standard consumer products</li>
        <li><strong>18% GST Rate:</strong> Most common rate for standard goods and services</li>
        <li><strong>28% GST Rate:</strong> Luxury items and sin goods</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Special Focus: GST on Gold</h2>
      
      <p className="mb-4">
        Gold and precious metals have a special GST rate of 3%. For gold jewelry, there are two components:
      </p>
      
      <ul className="list-disc pl-6 mb-4">
        <li>3% GST on the value of gold</li>
        <li>5% GST on making charges</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">How to Use This GST Calculator</h2>
      
      <ol className="list-decimal pl-6 mb-4">
        <li>Enter the amount in the input field</li>
        <li>Select the applicable GST rate</li>
        <li>Choose whether the amount includes or excludes GST</li>
        <li>For interstate transactions, select the IGST option</li>
        <li>View the complete tax breakdown instantly</li>
      </ol>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Pro Tip</h3>
        <p>
          For gold transactions, remember that the 3% GST rate applies to the base value, while making charges attract a separate 5% GST. Our calculator helps you compute both components accurately.
        </p>
      </div>
    </article>
  );
};

const GSTCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [includesGST, setIncludesGST] = useState<boolean>(false);
  const [isIGST, setIsIGST] = useState<boolean>(false);

  // Calculate GST values
  const calculateValues = () => {
    const numAmount = Number(amount) || 0;
    
    let baseAmount: number;
    let gstAmount: number;

    if (includesGST) {
      // If amount includes GST
      baseAmount = (numAmount * 100) / (100 + gstRate);
      gstAmount = numAmount - baseAmount;
    } else {
      // If amount excludes GST
      baseAmount = numAmount;
      gstAmount = (baseAmount * gstRate) / 100;
    }

    const total = baseAmount + gstAmount;
    const halfGST = gstAmount / 2;

    return {
      baseAmount: baseAmount.toFixed(2),
      cgst: isIGST ? '0.00' : halfGST.toFixed(2),
      sgst: isIGST ? '0.00' : halfGST.toFixed(2),
      igst: isIGST ? gstAmount.toFixed(2) : '0.00',
      total: total.toFixed(2)
    };
  };

  const values = calculateValues();

  return (
    <div className="container mx-auto px-4">
      <GSTArticle />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Section */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Calculate GST</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">GST Rate</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full p-3 border rounded-lg"
              >
                <option value="18">18% - Standard rate</option>
                <option value="12">12%</option>
                <option value="5">5%</option>
                <option value="28">28%</option>
                <option value="3">3% - Gold, silver, jewelry</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includesGST}
                  onChange={(e) => setIncludesGST(e.target.checked)}
                  className="mr-2"
                />
                Amount includes GST
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isIGST}
                  onChange={(e) => setIsIGST(e.target.checked)}
                  className="mr-2"
                />
                Inter-state transaction (IGST)
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Tax Breakdown</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Base Amount</span>
              <span className="font-semibold">₹ {values.baseAmount}</span>
            </div>

            {isIGST ? (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">IGST ({gstRate}%)</span>
                <span className="font-semibold text-green-600">₹ {values.igst}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">CGST ({gstRate/2}%)</span>
                  <span className="font-semibold text-green-600">₹ {values.cgst}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">SGST ({gstRate/2}%)</span>
                  <span className="font-semibold text-green-600">₹ {values.sgst}</span>
                </div>
              </>
            )}

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-purple-600">₹ {values.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator; 