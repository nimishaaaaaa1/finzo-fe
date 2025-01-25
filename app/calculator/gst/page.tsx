'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

// Add this interface near the top of the file
interface GSTResult {
  baseAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  gstAmount: number;
}

// Enhanced GST calculation with more precision
const calculateGST = (amount: number, rate: number, isInclusive: boolean) => {
  if (isInclusive) {
    const baseAmount = amount / (1 + (rate / 100));
    const gstAmount = amount - baseAmount;
    const halfGST = gstAmount / 2;
    return {
      baseAmount: Number(baseAmount.toFixed(2)),
      cgst: Number(halfGST.toFixed(2)),
      sgst: Number(halfGST.toFixed(2)),
      igst: Number(gstAmount.toFixed(2)),
      totalAmount: amount,
      gstAmount: Number(gstAmount.toFixed(2))
    };
  } else {
    const gstAmount = (amount * rate) / 100;
    const halfGST = gstAmount / 2;
    const totalAmount = amount + gstAmount;
    return {
      baseAmount: amount,
      cgst: Number(halfGST.toFixed(2)),
      sgst: Number(halfGST.toFixed(2)),
      igst: Number(gstAmount.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      gstAmount: Number(gstAmount.toFixed(2))
    };
  }
};

export default function GSTCalculatorPage() {
  const [gstInput, setGstInput] = useState({
    amount: 0,
    rate: 18,
    isInclusive: false,
    isInterState: false // New: Toggle between CGST/SGST and IGST
  });

  const [result, setResult] = useState<GSTResult | null>(null);

  // Add state for FAQ accordion
  const [openFaq, setOpenFaq] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <Head>
        <title>GST Calculator India {new Date().getFullYear()} | Free Online GST Calculator with CGST & SGST</title>
        <meta name="description" content="Most accurate GST Calculator India. Calculate GST, CGST, SGST & IGST instantly. Supports all GST rates (0.25% to 28%). Perfect for businesses & individuals. Free GST calculation tool." />
        <meta name="keywords" content="GST Calculator India, GST calculation, CGST calculator, SGST calculator, IGST calculator, 18 percent GST calculator, GST calculator inclusive, GST tax calculator" />
        {/* Add structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Finzo GST Calculator India",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[300px] rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000"
            alt="Business Analytics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
            <div className="text-white ml-12">
              <h1 className="text-4xl font-bold mb-4">GST Calculator India {new Date().getFullYear()}</h1>
              <p className="text-xl max-w-xl">Calculate GST instantly with India's most comprehensive calculator</p>
            </div>
          </div>
        </motion.div>

        {/* Calculator Grid with Visual Elements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calculator Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Calculate GST</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={gstInput.amount}
                  onChange={(e) => setGstInput({
                    ...gstInput,
                    amount: Number(e.target.value)
                  })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">GST Rate</label>
                <select
                  value={gstInput.rate}
                  onChange={(e) => setGstInput({
                    ...gstInput,
                    rate: Number(e.target.value)
                  })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={0.25}>0.25% - Rough precious stones</option>
                  <option value={3}>3% - Gold, silver, jewelry</option>
                  <option value={5}>5% - Essential items</option>
                  <option value={12}>12% - Standard rate</option>
                  <option value={18}>18% - Standard rate</option>
                  <option value={28}>28% - Luxury items</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={gstInput.isInclusive}
                    onChange={(e) => setGstInput({
                      ...gstInput,
                      isInclusive: e.target.checked
                    })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Amount includes GST</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={gstInput.isInterState}
                    onChange={(e) => setGstInput({
                      ...gstInput,
                      isInterState: e.target.checked
                    })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Inter-state transaction (IGST)</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Tax Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Amount</span>
                <span className="font-semibold">₹{result?.baseAmount}</span>
              </div>
              
              {gstInput.isInterState ? (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IGST ({gstInput.rate}%)</span>
                  <span className="text-green-600">₹{result?.igst}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CGST ({gstInput.rate/2}%)</span>
                    <span className="text-green-600">₹{result?.cgst}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SGST ({gstInput.rate/2}%)</span>
                    <span className="text-green-600">₹{result?.sgst}</span>
                  </div>
                </>
              )}

              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-purple-600">₹{result?.totalAmount}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Guide to GST */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8 my-16"
        >
          <Link href="/blog/basic-gst-calculation-guide" className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000"
                alt="Basic GST Calculation Guide"
                fill
                className="object-cover hover:scale-105 transition-duration-300"
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Basic Calculation</h3>
            <p className="text-gray-600">Simple GST calculations for regular transactions</p>
            <ul className="text-sm text-gray-500 mt-4 text-left list-disc list-inside">
              <li>Step-by-step GST calculation guide</li>
              <li>Common GST calculation scenarios</li>
              <li>Basic vs. composite scheme</li>
              <li>Real-world examples</li>
            </ul>
          </Link>

          <Link href="/blog/advanced-gst-features" className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000"
                alt="Advanced GST Features Guide"
                fill
                className="object-cover hover:scale-105 transition-duration-300"
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Advanced Features</h3>
            <p className="text-gray-600">CGST/SGST split and inter-state calculations</p>
            <ul className="text-sm text-gray-500 mt-4 text-left list-disc list-inside">
              <li>Understanding IGST vs CGST/SGST</li>
              <li>Place of supply rules</li>
              <li>Input tax credit mechanism</li>
              <li>Reverse charge scenarios</li>
            </ul>
          </Link>

          <Link href="/blog/gst-business-tools" className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000"
                alt="GST Business Tools Guide"
                fill
                className="object-cover hover:scale-105 transition-duration-300"
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Business Tools</h3>
            <p className="text-gray-600">Comprehensive GST management for businesses</p>
            <ul className="text-sm text-gray-500 mt-4 text-left list-disc list-inside">
              <li>GST compliance tools</li>
              <li>Return filing software</li>
              <li>E-invoicing solutions</li>
              <li>GST analytics dashboards</li>
            </ul>
          </Link>
        </motion.div>

        {/* GST Rate Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">GST Rates Explained</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { 
                rate: "0.25%", 
                color: "bg-green-100", 
                type: "Essential",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
              { 
                rate: "3%", 
                color: "bg-blue-100", 
                type: "Jewelry",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
              { 
                rate: "5%", 
                color: "bg-purple-100", 
                type: "Basic",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
              { 
                rate: "12%", 
                color: "bg-yellow-100", 
                type: "Standard",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
              { 
                rate: "18%", 
                color: "bg-orange-100", 
                type: "Services",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
              { 
                rate: "28%", 
                color: "bg-red-100", 
                type: "Luxury",
                href: "https://cbic-gst.gov.in/gst-goods-services-rates.html"
              },
            ].map((item) => (
              <motion.a
                key={item.rate}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`${item.color} p-6 rounded-xl text-center group cursor-pointer transition-all duration-300 hover:shadow-lg relative`}
              >
                <h3 className="text-2xl font-bold mb-2">{item.rate}</h3>
                <p className="text-gray-700">{item.type}</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Educational Content */}
        <div className="mt-16 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-purple max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6">Understanding GST Calculation in India</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold">How GST Works in India</h3>
                <p className="text-gray-600">
                  GST (Goods and Services Tax) in India follows a dual system where both Central (CGST) 
                  and State (SGST) governments collect tax on transactions. For interstate transactions, 
                  IGST applies. Our calculator automatically handles these splits, making tax calculation 
                  effortless.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">GST Rate Guide</h3>
                <p className="text-gray-600">
                  Different goods and services attract different GST rates:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>0.25% - Rough precious stones</li>
                  <li>3% - Gold, silver, jewelry</li>
                  <li>5% - Essential commodities</li>
                  <li>12% - Standard goods and services</li>
                  <li>18% - Most common rate for services</li>
                  <li>28% - Luxury items</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Inclusive vs Exclusive GST</h3>
                <p className="text-gray-600">
                  When calculating GST, you can either:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Add GST to your base amount (exclusive calculation)</li>
                  <li>Extract GST from the total amount (inclusive calculation)</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Our calculator supports both methods, making it versatile for all business needs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">When to Use IGST vs CGST/SGST</h3>
                <p className="text-gray-600">
                  For transactions within the same state, GST is split equally between CGST and SGST. 
                  For interstate transactions, the entire tax is collected as IGST. Our calculator 
                  automatically manages this split based on your selection.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Reference Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Quick GST Calculation Guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">For Businesses</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Track input and output GST</li>
                  <li>Calculate tax liability</li>
                  <li>Generate accurate invoices</li>
                  <li>Maintain compliance</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">For Individuals</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Verify purchase bills</li>
                  <li>Understand tax components</li>
                  <li>Plan expenses better</li>
                  <li>Make informed decisions</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Educational Sections */}
        <div className="space-y-8 mt-12">
          {/* Common GST Questions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
          >
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked GST Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How to calculate GST on ₹1 lakh?</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>For ₹1,00,000 with 18% GST:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>CGST (9%): ₹9,000</li>
                        <li>SGST (9%): ₹9,000</li>
                        <li>Total GST: ₹18,000</li>
                        <li>Final Amount: ₹1,18,000</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">What is RCM in GST?</h3>
                    <p className="text-gray-600">
                      Reverse Charge Mechanism (RCM) is where the recipient of goods/services pays GST instead of the supplier. 
                      Common in cases like:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
                      <li>Services from unregistered dealers</li>
                      <li>Import of services</li>
                      <li>Specified goods and services under RCM</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">GST Registration Threshold</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Registration is mandatory if your turnover exceeds:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li>₹40 lakhs for goods (general category states)</li>
                        <li>₹20 lakhs for services</li>
                        <li>₹10 lakhs for special category states</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden md:block w-1/3 h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000"
                  alt="Business Questions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* GST Benefits Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
          >
            <h2 className="text-2xl font-bold mb-6">Benefits of GST System</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">For Businesses</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Simplified tax structure</li>
                  <li>Input tax credit benefits</li>
                  <li>Reduced cascading effects</li>
                  <li>Easy online compliance</li>
                  <li>Unified market access</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">For Consumers</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Transparent pricing</li>
                  <li>Reduced overall tax burden</li>
                  <li>Uniform prices across states</li>
                  <li>Better service quality</li>
                  <li>Digital invoice tracking</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Add new FAQ item about GSTR-8 and TCS */}
          <div className="border-b pb-6">
            <button 
              className="w-full flex justify-between items-center text-left"
              onClick={() => setOpenFaq(openFaq === 'tcs' ? '' : 'tcs')}
            >
              <h3 className="text-xl font-semibold">What is TCS and GSTR-8 in GST?</h3>
              <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'tcs' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === 'tcs' && (
              <div className="mt-4 text-gray-600 space-y-3">
                <p>TCS (Tax Collected at Source) and GSTR-8 are important components of e-commerce GST compliance:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>GSTR-8 is a monthly return filed by e-commerce operators</li>
                  <li>Due date is 10th of the following month</li>
                  <li>Contains details of:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>Supplies made through the platform</li>
                      <li>TCS collected on these supplies</li>
                      <li>Amendments to previous returns</li>
                    </ul>
                  </li>
                  <li>Late filing penalties:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>Rs. 200 per day (Rs. 100 CGST + Rs. 100 SGST)</li>
                      <li>Maximum penalty of Rs. 5,000</li>
                      <li>18% per annum interest on late tax payment</li>
                    </ul>
                  </li>
                </ul>
                <p className="mt-3 text-sm italic">Note: GSTR-8 cannot be revised after filing. Any corrections must be made in subsequent months' returns.</p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Help Topics / FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">Popular Help Topics</h2>
          <div className="space-y-6">
            {/* GST Registration */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'registration' ? '' : 'registration')}
              >
                <h3 className="text-xl font-semibold">How do I register with GST?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'registration' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'registration' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>Follow these steps to register for GST:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Visit the GST Portal (www.gst.gov.in)</li>
                    <li>Click on 'Registration' under 'Services'</li>
                    <li>Select 'New Registration'</li>
                    <li>Fill Form GST REG-01</li>
                    <li>Upload required documents:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>PAN card</li>
                        <li>Address proof</li>
                        <li>Bank account statement</li>
                        <li>Business registration documents</li>
                      </ul>
                    </li>
                    <li>Submit the form and receive ARN</li>
                    <li>Track application status using ARN</li>
                  </ol>
                  <p className="mt-3">Note: Registration is mandatory if your turnover exceeds ₹40 lakhs (₹20 lakhs for special category states).</p>
                </div>
              )}
            </div>

            {/* GST Refund */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'refund' ? '' : 'refund')}
              >
                <h3 className="text-xl font-semibold">How do I apply for refund?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'refund' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'refund' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>GST refund process:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>File Form RFD-01A on GST portal</li>
                    <li>Submit supporting documents:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Statement of invoices</li>
                        <li>Bank account details</li>
                        <li>Export documents (if applicable)</li>
                      </ul>
                    </li>
                    <li>Track refund status using ARN</li>
                  </ol>
                  <p className="mt-3">Common refund scenarios:</p>
                  <ul className="list-disc list-inside">
                    <li>Excess payment of tax</li>
                    <li>Export of goods/services</li>
                    <li>Inverted duty structure</li>
                    <li>Provisional assessment finalization</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Filing Returns */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'returns' ? '' : 'returns')}
              >
                <h3 className="text-xl font-semibold">How do I file returns?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'returns' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'returns' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>Key GST returns and due dates:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>GSTR-1 (Outward supplies) - 11th of next month</li>
                    <li>GSTR-3B (Monthly summary) - 20th of next month</li>
                    <li>GSTR-9 (Annual return) - 31st December of next FY</li>
                  </ul>
                  <p className="mt-3">Filing steps:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Login to GST portal</li>
                    <li>Navigate to Returns section</li>
                    <li>Select return type and period</li>
                    <li>Fill required details</li>
                    <li>Pay applicable tax</li>
                    <li>File return</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Returns Offline Tool */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'offline' ? '' : 'offline')}
              >
                <h3 className="text-xl font-semibold">How can I use Returns Offline Tool?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'offline' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'offline' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>Steps to use offline tool:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Download offline tool from GST portal</li>
                    <li>Install the application</li>
                    <li>Create profile and enter business details</li>
                    <li>Enter invoice details offline</li>
                    <li>Generate JSON file</li>
                    <li>Upload to GST portal</li>
                  </ol>
                  <p className="mt-3">Benefits:</p>
                  <ul className="list-disc list-inside">
                    <li>Work without internet connection</li>
                    <li>Bulk upload facility</li>
                    <li>Data validation before upload</li>
                    <li>Save and edit facility</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Filing Appeal */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'appeal' ? '' : 'appeal')}
              >
                <h3 className="text-xl font-semibold">How do I file an appeal?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'appeal' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'appeal' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>Appeal filing process:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>File within 3 months of order date</li>
                    <li>Submit Form GST APL-01</li>
                    <li>Pay mandatory pre-deposit</li>
                    <li>Attach supporting documents</li>
                    <li>Track appeal status</li>
                  </ol>
                  <p className="mt-3">Required documents:</p>
                  <ul className="list-disc list-inside">
                    <li>Order being appealed against</li>
                    <li>Statement of facts</li>
                    <li>Grounds of appeal</li>
                    <li>Proof of pre-deposit payment</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Voluntary Payment */}
            <div className="border-b pb-6">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === 'voluntary' ? '' : 'voluntary')}
              >
                <h3 className="text-xl font-semibold">How do I file intimation about voluntary payment?</h3>
                <svg className={`w-6 h-6 transform transition-transform ${openFaq === 'voluntary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 'voluntary' && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>Steps for voluntary payment:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Login to GST portal</li>
                    <li>Navigate to Payments section</li>
                    <li>Select 'Voluntary Payment'</li>
                    <li>Fill Form GST DRC-03</li>
                    <li>Make payment</li>
                    <li>Download payment acknowledgment</li>
                  </ol>
                  <p className="mt-3">Important points:</p>
                  <ul className="list-disc list-inside">
                    <li>Can be done before or after notice</li>
                    <li>Reduces interest liability</li>
                    <li>Shows compliance willingness</li>
                    <li>May reduce penalty</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}