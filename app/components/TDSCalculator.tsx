'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// SEO-optimized article section
const TDSArticle = () => {
  return (
    <article className="prose max-w-none mb-8">
      <h1 className="text-3xl font-bold mb-6">TDS (Tax Deducted at Source) Calculator</h1>
      
      <p className="lead-paragraph">
        Calculate your TDS (Tax Deducted at Source) amount instantly with our free online calculator. TDS is a method of collecting tax directly from the source of income, where the payer deducts tax before making payments for salary, rent, interest, professional fees, and more.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg my-6">
        <h2 className="text-xl font-semibold mb-3">Key Features of Our TDS Calculator:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Instant calculation of TDS amount</li>
          <li>Support for all types of payments (salary, rent, commission, etc.)</li>
          <li>Updated rates as per latest Income Tax rules</li>
          <li>Higher rate calculation for non-PAN transactions</li>
          <li>Detailed breakdown of tax components</li>
        </ul>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions about TDS</h2>
        
        <div className="space-y-6">
          <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 className="text-xl font-semibold mb-3" itemProp="name">How do I calculate my TDS?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text" className="text-gray-600">
                To calculate TDS:
                <ol className="list-decimal pl-5 mt-2">
                  <li>Determine the applicable TDS rate for your income type (salary, rent, interest, etc.)</li>
                  <li>Multiply your gross income by the TDS rate percentage</li>
                  <li>For salary: TDS is calculated on your taxable income after considering deductions under Section 80C</li>
                  <li>For non-salary: TDS is usually calculated on the gross amount</li>
                  <li>Use our calculator above for instant and accurate calculations</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 className="text-xl font-semibold mb-3" itemProp="name">What is the TDS for 50,000 salary?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text" className="text-gray-600">
                For a monthly salary of ₹50,000:
                <ul className="list-disc pl-5 mt-2">
                  <li>Annual salary: ₹6,00,000</li>
                  <li>TDS rate depends on your tax regime and applicable deductions</li>
                  <li>Under old regime with standard deduction: Approximately ₹2,500 per month</li>
                  <li>Under new regime: Varies based on your tax slab</li>
                <li>Use our calculator above with your specific details for accurate TDS</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 className="text-xl font-semibold mb-3" itemProp="name">Is TDS rate 1% or 2%?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text" className="text-gray-600">
                TDS rates vary based on the type of payment:
                <ul className="list-disc pl-5 mt-2">
                  <li>1% TDS: Applies to sale of property, certain goods, and specific contract payments</li>
                  <li>2% TDS: Applies to professional fees, technical services, and certain contract payments</li>
                  <li>10% TDS: Common rate for salary, rent, and interest payments</li>
                  <li>Higher rates apply when PAN is not furnished</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 className="text-xl font-semibold mb-3" itemProp="name">What is the TDS for an 80,000 salary?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text" className="text-gray-600">
                For a monthly salary of ₹80,000:
                <ul className="list-disc pl-5 mt-2">
                  <li>Annual salary: ₹9,60,000</li>
                  <li>TDS calculation depends on your tax regime choice</li>
                  <li>Under old regime with standard deduction: Approximately ₹4,000-5,000 per month</li>
                  <li>Under new regime: Based on applicable tax slab</li>
                  <li>Use our calculator above for precise calculations based on your deductions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular TDS Calculator Types</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Salary TDS Calculator</h3>
              <p>Calculate TDS on your monthly or annual salary with standard deductions.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">TDS Calculator on Rent</h3>
              <p>Compute TDS for rental payments exceeding ₹50,000 per month.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Interest TDS Calculator</h3>
              <p>Calculate TDS on interest earned from deposits and securities.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Property Purchase TDS</h3>
              <p>Compute TDS on property transactions as per Section 194-IA.</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

// Add this new component for tax slabs
const TaxSlabSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-semibold mb-4">Income Tax Slabs for FY 2024-25 (AY 2025-26)</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* New Tax Regime */}
        <div>
          <h4 className="text-xl font-semibold mb-4">New Tax Regime</h4>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Income Range</th>
                <th className="p-4 text-left">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">Up to ₹3 lakh</td>
                <td className="p-4">Nil</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">₹3 lakh to ₹6 lakh</td>
                <td className="p-4">5%</td>
              </tr>
              <tr>
                <td className="p-4">₹6 lakh to ₹9 lakh</td>
                <td className="p-4">10%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">₹9 lakh to ₹12 lakh</td>
                <td className="p-4">15%</td>
              </tr>
              <tr>
                <td className="p-4">₹12 lakh to ₹15 lakh</td>
                <td className="p-4">20%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">Above ₹15 lakh</td>
                <td className="p-4">30%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Old Tax Regime */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Old Tax Regime</h4>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Income Range</th>
                <th className="p-4 text-left">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">Up to ₹2.5 lakh</td>
                <td className="p-4">Nil</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">₹2.5 lakh to ₹5 lakh</td>
                <td className="p-4">5%</td>
              </tr>
              <tr>
                <td className="p-4">₹5 lakh to ₹10 lakh</td>
                <td className="p-4">20%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">Above ₹10 lakh</td>
                <td className="p-4">30%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Update the TDS rates table with clickable links
const TDSRatesTable = () => {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Payment Type</th>
            <th className="p-4 text-left">TDS Section</th>
            <th className="p-4 text-left">TDS Rate</th>
            <th className="p-4 text-left">Threshold Limit</th>
            <th className="p-4 text-left">Official Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">Salary</td>
            <td className="p-4">
              <a 
                href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section192" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                192
              </a>
            </td>
            <td className="p-4">
              <a 
                href="https://incometaxindia.gov.in/Pages/tools/tax-calculator.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                As per slab rate
              </a>
            </td>
            <td className="p-4">₹2.5 Lakh p.a.</td>
            <td className="p-4">
              <a 
                href="https://www.incometax.gov.in/iec/foportal/help/tds-on-salary" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Official Guide
              </a>
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="p-4">Interest on Securities</td>
            <td className="p-4">
              <a 
                href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section193" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                193
              </a>
            </td>
            <td className="p-4">10%</td>
            <td className="p-4">₹5,000 p.a.</td>
            <td className="p-4">
              <a 
                href="https://www.incometax.gov.in/iec/foportal/help/tds-on-interest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Official Guide
              </a>
            </td>
          </tr>
          {/* Add similar rows for other payment types */}
        </tbody>
      </table>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">Useful Resources:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a 
              href="https://www.incometax.gov.in/iec/foportal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Income Tax Portal
            </a>
            {" "}- File returns, check forms, and more
          </li>
          <li>
            <a 
              href="https://www.tdscpc.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TRACES Portal
            </a>
            {" "}- Download forms, check challans
          </li>
          <li>
            <a 
              href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Link Aadhaar
            </a>
            {" "}- Link your PAN with Aadhaar
          </li>
        </ul>
      </div>
    </div>
  );
};

// Add this section within the TDSInformation component

const TDSFilingSchedule = () => {
  return (
    <section className="my-8">
      <h3 className="text-2xl font-semibold mb-6">TDS Filing and Payment Deadlines</h3>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-4">Monthly Payment Deadlines</h4>
          <table className="min-w-full mb-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Month of Deduction</th>
                <th className="p-4 text-left">Due Date for Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">April to February</td>
                <td className="p-4">7th of the next month</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">March</td>
                <td className="p-4">30th April</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-xl font-semibold mb-4">Quarterly TDS Return Filing</h4>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Quarter Period</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-left">Form</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">April - June</td>
                <td className="p-4">31st July</td>
                <td className="p-4">24Q/26Q/27Q</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">July - September</td>
                <td className="p-4">31st October</td>
                <td className="p-4">24Q/26Q/27Q</td>
              </tr>
              <tr>
                <td className="p-4">October - December</td>
                <td className="p-4">31st January</td>
                <td className="p-4">24Q/26Q/27Q</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4">January - March</td>
                <td className="p-4">31st May</td>
                <td className="p-4">24Q/26Q/27Q</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-6">
          <h4 className="text-xl font-semibold mb-4">TDS Return Forms</h4>
          <ul className="space-y-3">
            <li><strong>Form 24Q:</strong> For TDS on Salary</li>
            <li><strong>Form 26Q:</strong> For TDS on payments other than salary to residents</li>
            <li><strong>Form 27Q:</strong> For TDS on payments to non-residents</li>
          </ul>
        </div>

        <div className="p-6">
          <h4 className="text-xl font-semibold mb-4">TDS Certificate Issuance Deadlines</h4>
          <ul className="space-y-3">
            <li><strong>Form 16 (Salary):</strong> By June 15th of the next financial year</li>
            <li><strong>Form 16A (Non-Salary):</strong> Within 15 days from the due date of filing TDS return</li>
            <li><strong>Form 16B (Property):</strong> Within 15 days from due date of submitting TDS payment</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6">
          <h4 className="text-xl font-semibold mb-4">Important Points to Remember</h4>
          <ul className="list-disc pl-6 space-y-3">
            <li>Late filing of TDS returns attracts penalties under section 234E</li>
            <li>Fee of ₹200 per day until the return is filed (subject to maximum TDS amount)</li>
            <li>Additional penalties under section 271H for incorrect information</li>
            <li>Interest under section 201(1A) for late payment of TDS</li>
            <li>Regular reconciliation of Form 26AS is recommended</li>
          </ul>
        </div>

        <div className="p-6">
          <h4 className="text-xl font-semibold mb-4">Steps for Filing TDS Returns</h4>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Prepare TDS return using RPU/Excel utility from NSDL</li>
            <li>Validate the return file using File Validation Utility (FVU)</li>
            <li>Generate Form 27A</li>
            <li>Upload the return on TIN-NSDL website</li>
            <li>Track status using the acknowledgment number</li>
          </ol>
        </div>

        <div className="bg-green-50 p-6">
          <h4 className="text-xl font-semibold mb-4">Pro Tips for TDS Filing</h4>
          <ul className="list-disc pl-6 space-y-3">
            <li>Maintain proper documentation of all TDS deductions and payments</li>
            <li>Keep PAN details of all deductees updated</li>
            <li>File returns well before due dates to avoid last-minute technical issues</li>
            <li>Regularly check for any TDS return defaults or pending issues</li>
            <li>Use automated TDS compliance tools for large volume of transactions</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Update the main TDSInformation component to include these sections
const TDSInformation = () => {
  return (
    <article className="prose max-w-none mt-12">
      {/* Hero Section with Image */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
          alt="Tax calculation and financial planning"
          width={1200}
          height={400}
          className="object-cover rounded-xl"
          priority
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center px-8"
        >
          <h1 className="text-4xl font-bold text-white mb-8 max-w-2xl">
            TDS Calculator: Calculate Tax Deducted at Source Online
          </h1>
        </motion.div>
      </div>

      {/* Main TDS Explanation with Icon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 p-6 rounded-lg mb-8 flex gap-6 items-start"
      >
        <Image
          src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80"
          alt="Tax calculation concept"
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">What is TDS?</h2>
          <p>
            TDS (Tax Deducted at Source) is a method of collecting income tax in India where the payer deducts a certain percentage of tax before making payment to the recipient. This system ensures regular flow of tax revenue to the government and helps track financial transactions.
          </p>
        </div>
      </motion.div>

      {/* TDS Rates Table with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Common TDS Rates and Sections</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left border">Payment Type</th>
                <th className="p-4 text-left border">TDS Section</th>
                <th className="p-4 text-left border">TDS Rate</th>
                <th className="p-4 text-left border">Threshold Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border">Salary</td>
                <td className="p-4 border">
                  <a href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section192"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    192
                  </a>
                </td>
                <td className="p-4 border">
                  <a href="https://incometaxindia.gov.in/Pages/tools/tax-calculator.aspx"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    As per slab rate
                  </a>
                </td>
                <td className="p-4 border">₹2.5 Lakh p.a.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border">Interest on Securities</td>
                <td className="p-4 border">
                  <a href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section193"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    193
                  </a>
                </td>
                <td className="p-4 border">10%</td>
                <td className="p-4 border">₹5,000 p.a.</td>
              </tr>
              <tr>
                <td className="p-4 border">Rent for Property</td>
                <td className="p-4 border">
                  <a href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section194I"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    194I
                  </a>
                </td>
                <td className="p-4 border">10%</td>
                <td className="p-4 border">₹2.4 Lakh p.a.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border">Professional Fees</td>
                <td className="p-4 border">
                  <a href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx#Section194J"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    194J
                  </a>
                </td>
                <td className="p-4 border">10%</td>
                <td className="p-4 border">₹30,000 p.a.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Source: <a href="https://incometaxindia.gov.in/pages/tools/tds-calculator.aspx" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline">
            Income Tax India
          </a>, <a href="https://cleartax.in/s/tds-calculator"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline">
            ClearTax
          </a>
        </p>
      </motion.div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Important Notes:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Higher TDS rate (20%) applies if PAN is not provided</li>
          <li>TDS must be deposited by 7th of the next month</li>
          <li>Late deposit attracts interest penalty of 1.5% per month</li>
          <li>TDS certificates (Form 16/16A) must be issued quarterly</li>
        </ul>
      </div>

      {/* Useful Resources */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Useful Resources:</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <a 
              href="https://www.incometax.gov.in/iec/foportal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Income Tax Portal
            </a>
            {" "}- File returns, check forms, and more
          </li>
          <li>
            <a 
              href="https://www.tdscpc.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TRACES Portal
            </a>
            {" "}- Download forms, check challans
          </li>
          <li>
            <a 
              href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Link Aadhaar
            </a>
            {" "}- Link your PAN with Aadhaar
          </li>
        </ul>
      </div>

      {/* Visual Steps Section - Horizontal Grid with Unsplash Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-64 mb-6">
            <Image
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80"
              alt="Calculator and financial documents for TDS calculation"
              width={500}
              height={300}
              className="rounded-xl object-cover w-full h-full"
              priority
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3">1. Calculate TDS</h3>
            <p className="text-gray-600">Determine the applicable TDS rate and calculate the deduction amount</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-64 mb-6">
            <Image
              src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80"
              alt="Online payment for TDS deposit"
              width={500}
              height={300}
              className="rounded-xl object-cover w-full h-full"
              priority
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3">2. Deposit TDS</h3>
            <p className="text-gray-600">Deposit the deducted amount with the government by due date</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-64 mb-6">
            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
              alt="Filing tax returns and documents"
              width={500}
              height={300}
              className="rounded-xl object-cover w-full h-full"
              priority
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3">3. File Returns</h3>
            <p className="text-gray-600">File quarterly TDS returns and issue certificates</p>
          </div>
        </motion.div>
      </div>

      {/* FAQs Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">How is TDS calculated on salary?</h3>
            <p>TDS on salary is calculated based on the estimated annual income and applicable income tax slab rates. The employer considers declared investments and deductions to determine the monthly TDS amount.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">What happens if TDS is not deducted?</h3>
            <p>Failure to deduct TDS can result in penalties under section 271C, equal to the amount of TDS not deducted. Additionally, interest charges apply under section 201(1A).</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Can I claim refund of excess TDS?</h3>
            <p>Yes, excess TDS can be claimed as refund while filing your income tax return. The refund will be processed after verification of your return.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">When should TDS be deposited?</h3>
            <p>TDS must be deposited with the government by the 7th of the following month. For March (end of financial year), the due date is 30th April.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">How can I check my TDS status?</h3>
            <p>You can check your TDS status in Form 26AS through the income tax portal or your bank's net banking facility. It shows all TDS deductions made from your income.</p>
          </div>
        </div>
      </div>

      {/* SEO Meta Tags - Add these in the head section */}
      <meta name="description" content="Calculate TDS (Tax Deducted at Source) instantly with our free online calculator. Know applicable TDS rates, due dates, and compliance requirements." />
      <meta name="keywords" content="TDS calculator, tax deducted at source, TDS rates, TDS on salary, Form 16, income tax, tax calculator" />

      {/* Floating Help Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        Need Help?
      </motion.button>
    </article>
  );
};

const TDSCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [paymentType, setPaymentType] = useState<string>('salary');
  const [hasPAN, setHasPAN] = useState<boolean>(true);

  const calculateTDS = () => {
    const numAmount = Number(amount) || 0;
    let tdsRate = getTDSRate(paymentType, hasPAN);
    const tdsAmount = (numAmount * tdsRate) / 100;
    
    return {
      baseAmount: numAmount.toFixed(2),
      tdsRate: `${tdsRate}%`,
      tdsAmount: tdsAmount.toFixed(2),
      netAmount: (numAmount - tdsAmount).toFixed(2)
    };
  };

  const getTDSRate = (type: string, pan: boolean): number => {
    if (!pan) return 20; // Higher rate for no PAN
    
    switch (type) {
      case 'salary':
        return 10;
      case 'rent':
        return 10;
      case 'professional':
        return 10;
      default:
        return 10;
    }
  };

  const values = calculateTDS();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">TDS Calculator</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Calculate TDS</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Payment Amount (₹)</label>
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
              <label className="block text-gray-700 mb-2">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="salary">Salary</option>
                <option value="rent">Rent</option>
                <option value="professional">Professional Fees</option>
                <option value="interest">Interest</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasPAN}
                  onChange={(e) => setHasPAN(e.target.checked)}
                  className="rounded"
                />
                <span>Has PAN Card</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Tax Breakdown</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Base Amount</span>
              <span className="font-semibold">₹ {values.baseAmount}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-gray-600">TDS Rate</span>
              <span className="font-semibold text-green-600">{values.tdsRate}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">TDS Amount</span>
              <span className="font-semibold text-red-600">₹ {values.tdsAmount}</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-bold">Net Amount</span>
              <span className="font-bold text-purple-600">₹ {values.netAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add the information section */}
      <TDSInformation />
    </div>
  );
};

export default TDSCalculator; 