import React from 'react';
import InvestmentCalculator from '@/components/calculators/investment/InvestmentCalculator';

export const metadata = {
  title: 'Investment Calculator | Finzo',
  description: 'Plan your financial future with our advanced investment calculator. See how your investments can grow over time.',
};

export default function InvestmentCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Investment Calculator</h1>
          <p className="text-xl text-gray-600">
            Plan your financial future with our advanced investment calculator. See how your investments can grow over time.
          </p>
        </div>
        
        <InvestmentCalculator />
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">1. Select Investment Type</h3>
              <p className="text-gray-600">Choose from various investment options like mutual funds, stocks, fixed deposits, and more. Each has a different average annual return rate.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">2. Set Initial Investment</h3>
              <p className="text-gray-600">Enter the amount you plan to invest upfront. This is your starting investment.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">3. Add Monthly Contributions</h3>
              <p className="text-gray-600">Specify how much you plan to add to your investment each month. Regular contributions can significantly boost your returns.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">4. Choose Investment Period</h3>
              <p className="text-gray-600">Select how long you plan to keep your money invested. Longer periods typically yield better results due to compound interest.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">5. Analyze Results</h3>
              <p className="text-gray-600">Review the projected future value, total investment, and interest earned. The chart shows how your investment grows over time.</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Important Note</h3>
            <p className="text-gray-600">This calculator provides estimates based on average returns. Actual investment performance may vary due to market conditions, fees, and other factors. It's always advisable to consult with a financial advisor before making investment decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 