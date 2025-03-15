'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InvestmentEducation() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <Card className="p-6 shadow-md rounded-xl bg-white">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Investment Education</h3>

      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-6">
          <div className="bg-blue-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-blue-800 mb-3">Compound Interest</h4>
            <p className="text-gray-700 mb-4">
              Compound interest is the eighth wonder of the world. It occurs when the interest you earn on an investment 
              generates its own interest over time.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-800 mb-2">The Formula</h5>
              <p className="text-sm text-gray-600 mb-2">For a lump sum investment:</p>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-3">
                A = P(1 + r)<sup>t</sup>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium">A</span> = Final amount</li>
                <li><span className="font-medium">P</span> = Principal (initial investment)</li>
                <li><span className="font-medium">r</span> = Annual interest rate (in decimal)</li>
                <li><span className="font-medium">t</span> = Time period (in years)</li>
              </ul>
              
              <p className="text-sm text-gray-600 mt-4 mb-2">For regular investments (SIP):</p>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-3">
                A = P × ((1 + r)<sup>n</sup> - 1) / r × (1 + r)
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium">A</span> = Final amount</li>
                <li><span className="font-medium">P</span> = Regular payment amount</li>
                <li><span className="font-medium">r</span> = Rate per period (in decimal)</li>
                <li><span className="font-medium">n</span> = Number of periods</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-green-800 mb-3">Inflation-Adjusted Returns</h4>
            <p className="text-gray-700 mb-4">
              Inflation erodes the purchasing power of money over time. Inflation-adjusted returns (or real returns) 
              show how much your investment has actually grown in terms of purchasing power.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-800 mb-2">The Formula</h5>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-3">
                Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
              </div>
              
              <div className="mt-4">
                <h5 className="font-medium text-gray-800 mb-2">Example</h5>
                <p className="text-sm text-gray-600">
                  If your investment grows by 12% in a year with 5% inflation, your real return is:
                </p>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm mt-2">
                  ((1 + 0.12) / (1 + 0.05)) - 1 = 0.0667 or 6.67%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-800 mb-3">Risk and Return Relationship</h4>
            <p className="text-gray-700 mb-4">
              Higher potential returns generally come with higher risk. Understanding this relationship is crucial 
              for making informed investment decisions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-blue-800 mb-2">Low Risk</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Fixed Deposits</li>
                  <li>Government Bonds</li>
                  <li>Treasury Bills</li>
                </ul>
                <div className="mt-3 text-sm">
                  <span className="font-medium">Expected Returns:</span> 5-8%
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-green-800 mb-2">Medium Risk</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Balanced Mutual Funds</li>
                  <li>Corporate Bonds</li>
                  <li>REITs</li>
                </ul>
                <div className="mt-3 text-sm">
                  <span className="font-medium">Expected Returns:</span> 8-12%
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-red-800 mb-2">High Risk</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Stocks</li>
                  <li>Equity Mutual Funds</li>
                  <li>Cryptocurrency</li>
                </ul>
                <div className="mt-3 text-sm">
                  <span className="font-medium">Expected Returns:</span> 12-20%+
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <div className="bg-purple-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-purple-800 mb-3">Systematic Investment Plan (SIP)</h4>
            <p className="text-gray-700 mb-4">
              SIP is an investment strategy where you invest a fixed amount regularly (usually monthly) in mutual funds 
              or other investment vehicles, regardless of market conditions.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-800 mb-2">Benefits of SIP</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><span className="font-medium">Rupee Cost Averaging:</span> By investing regularly, you buy more units when prices are low and fewer when prices are high, potentially lowering your average cost per unit.</li>
                <li><span className="font-medium">Disciplined Investing:</span> Enforces financial discipline by committing to regular investments.</li>
                <li><span className="font-medium">Power of Compounding:</span> Regular investments over long periods benefit significantly from compound growth.</li>
                <li><span className="font-medium">Flexibility:</span> You can start with small amounts and increase over time.</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-indigo-800 mb-3">Asset Allocation</h4>
            <p className="text-gray-700 mb-4">
              Asset allocation is the process of dividing your investments among different asset classes like stocks, bonds, 
              and cash to balance risk and reward according to your goals, risk tolerance, and investment horizon.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-800 mb-2">Sample Allocations by Age</h5>
              <div className="space-y-4 mt-3">
                <div>
                  <h6 className="font-medium text-gray-700">20s-30s (Long Horizon)</h6>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>80% Equity</span>
                    <span>20% Debt</span>
                  </div>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-700">40s-50s (Medium Horizon)</h6>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>60% Equity</span>
                    <span>40% Debt</span>
                  </div>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-700">60+ (Short Horizon)</h6>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>40% Equity</span>
                    <span>60% Debt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-5 rounded-lg">
            <h4 className="text-lg font-medium text-pink-800 mb-3">Tax-Efficient Investing</h4>
            <p className="text-gray-700 mb-4">
              Tax-efficient investing strategies help maximize your after-tax returns by minimizing the tax impact on your investments.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-800 mb-2">Tax-Saving Investment Options in India</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><span className="font-medium">ELSS (Equity Linked Saving Scheme):</span> Mutual funds with 3-year lock-in period, eligible for tax deduction under Section 80C.</li>
                <li><span className="font-medium">PPF (Public Provident Fund):</span> Government-backed savings scheme with 15-year tenure, tax-free interest, and eligible for Section 80C deduction.</li>
                <li><span className="font-medium">NPS (National Pension System):</span> Retirement savings scheme with additional tax benefits under Section 80CCD(1B).</li>
                <li><span className="font-medium">Tax-Free Bonds:</span> Bonds issued by government entities with interest exempt from income tax.</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

const faqs = [
  {
    id: 'faq-1',
    question: 'What is the difference between SIP and lump sum investment?',
    answer: 'SIP (Systematic Investment Plan) involves investing a fixed amount regularly over time, while lump sum investment means investing a large amount all at once. SIP helps in averaging out the purchase cost over time and is suitable for disciplined, long-term investing. Lump sum can be beneficial when you have a large amount ready to invest and believe the market is at a low point.'
  },
  {
    id: 'faq-2',
    question: 'How does inflation affect my investments?',
    answer: 'Inflation reduces the purchasing power of money over time. If your investment returns are lower than the inflation rate, your money is actually losing value in real terms. This is why it\'s important to aim for returns that beat inflation. For example, if inflation is 5% and your investment grows by 8%, your real return is only about 3%.'
  },
  {
    id: 'faq-3',
    question: 'What is the rule of 72?',
    answer: 'The Rule of 72 is a simple way to determine how long it will take for an investment to double given a fixed annual rate of return. Divide 72 by the annual rate of return to get the approximate number of years. For example, at 8% annual returns, an investment will double in approximately 72 ÷ 8 = 9 years.'
  },
  {
    id: 'faq-4',
    question: 'How much should I save for retirement?',
    answer: 'A common guideline is to save 15-20% of your income for retirement. However, the exact amount depends on your current age, desired retirement age, expected lifestyle in retirement, and other factors. It\'s best to use a retirement calculator or consult a financial advisor for personalized guidance.'
  },
  {
    id: 'faq-5',
    question: 'What is the difference between active and passive investing?',
    answer: 'Active investing involves trying to beat the market by picking individual stocks or timing the market. It typically involves higher fees and requires more knowledge and time. Passive investing involves buying and holding a diversified portfolio (often through index funds) that tracks a market index. It typically has lower fees and has been shown to outperform active strategies for most investors over the long term.'
  },
  {
    id: 'faq-6',
    question: 'How do taxes impact investment returns?',
    answer: 'Different investments are taxed differently. In India, equity investments held for more than a year are subject to long-term capital gains tax of 10% (above ₹1 lakh), while short-term gains are taxed at 15%. For debt investments, short-term gains are added to your income and taxed at your income tax slab rate, while long-term gains (held for more than 3 years) are taxed at 20% with indexation benefits.'
  }
]; 