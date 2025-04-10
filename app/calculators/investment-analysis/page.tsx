import React from 'react';
import InvestmentAnalysis from '@/components/calculators/investment-analysis/InvestmentAnalysis';

export const metadata = {
  title: 'Investment Analysis & Simulation | Finzo',
  description: 'Make informed investment decisions using prediction market-based scenario analysis and simulation.',
};

export default function InvestmentAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Investment Analysis & Simulation</h1>
          <p className="text-xl text-gray-600">
            Make data-driven investment decisions using prediction market-based scenario analysis and simulation.
          </p>
        </div>
        
        <InvestmentAnalysis />
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">How This Works</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">1. Prediction Market Integration</h3>
              <p className="text-gray-600">We integrate with leading prediction markets to gather real-time probability estimates for various economic and market scenarios.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">2. Scenario Analysis</h3>
              <p className="text-gray-600">Analyze how your investments might perform under different market conditions, weighted by their probability of occurrence.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">3. Monte Carlo Simulation</h3>
              <p className="text-gray-600">Run thousands of simulations to understand the range of possible outcomes and their likelihoods.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">4. Risk Assessment</h3>
              <p className="text-gray-600">Evaluate potential risks and rewards based on the simulated outcomes and their probabilities.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">5. Decision Support</h3>
              <p className="text-gray-600">Get actionable insights and recommendations based on the analysis of all possible scenarios.</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">About Prediction Markets</h3>
            <p className="text-gray-600">
              Prediction markets are platforms where participants trade contracts based on the outcome of uncertain future events. 
              The prices of these contracts reflect the collective wisdom of the market participants and provide valuable probability estimates 
              for various scenarios. These estimates are often more accurate than expert predictions alone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 