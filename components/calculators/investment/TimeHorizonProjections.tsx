'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import financialDataService from '@/services/api/financialDataService';

interface TimeHorizonProjectionsProps {
  initialAmount: number;
  monthlyContribution: number;
  interestRate: number;
}

export function TimeHorizonProjections({
  initialAmount,
  monthlyContribution,
  interestRate
}: TimeHorizonProjectionsProps) {
  // Calculate projections for different time horizons
  const projections = useMemo(() => {
    return financialDataService.calculateReturnsForTimeHorizons(
      initialAmount,
      monthlyContribution,
      interestRate
    );
  }, [initialAmount, monthlyContribution, interestRate]);

  // Format currency in Indian format (lakhs, crores)
  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) { // 1 crore or more
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) { // 1 lakh or more
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toFixed(2)}`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Investment Projections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left border">Time Horizon</th>
                <th className="p-2 text-left border">Future Value</th>
                <th className="p-2 text-left border">Total Investment</th>
                <th className="p-2 text-left border">Interest Earned</th>
                <th className="p-2 text-left border">Growth Multiple</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((projection) => (
                <tr key={projection.years} className="hover:bg-gray-50">
                  <td className="p-2 border font-medium">{projection.years} {projection.years === 1 ? 'Year' : 'Years'}</td>
                  <td className="p-2 border">{formatCurrency(projection.totalFV)}</td>
                  <td className="p-2 border">{formatCurrency(projection.totalInvestment)}</td>
                  <td className="p-2 border">{formatCurrency(projection.interestEarned)}</td>
                  <td className="p-2 border">{projection.growthMultiple.toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Understanding Your Projections</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Future Value:</span> The estimated total value of your investment at the end of each time period.
              </li>
              <li>
                <span className="font-medium">Total Investment:</span> The sum of your initial investment and all monthly contributions over the time period.
              </li>
              <li>
                <span className="font-medium">Interest Earned:</span> The difference between the future value and total investment, representing your returns.
              </li>
              <li>
                <span className="font-medium">Growth Multiple:</span> How many times your investment has grown compared to the amount you invested.
              </li>
            </ul>
          </div>
          
          <div className="text-xs text-gray-500 mt-4">
            <p>Note: These projections are based on a constant annual return rate of {interestRate}% and do not account for inflation, taxes, or market volatility.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TimeHorizonProjections; 