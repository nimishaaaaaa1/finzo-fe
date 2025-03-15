'use client';

import React from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

export function RealTimeFinancialData() {
  const {
    marketIndices,
    historicalReturns,
    currentRates,
    inflationData,
    loading,
    error,
    lastUpdated,
    refreshData,
    getInflationAdjustedReturn
  } = useFinancialData();

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

  // Format percentage with + sign for positive values
  const formatPercentage = (value: number): string => {
    return value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Financial Data...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error Loading Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
          <button 
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Market & Investment Data</CardTitle>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Last updated: {format(lastUpdated, 'dd MMM yyyy, HH:mm')}
            </span>
          )}
          <button 
            onClick={refreshData}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Refresh data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="market">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="market" className="flex-1">Market Indices</TabsTrigger>
            <TabsTrigger value="returns" className="flex-1">Historical Returns</TabsTrigger>
            <TabsTrigger value="inflation" className="flex-1">Inflation-Adjusted</TabsTrigger>
            <TabsTrigger value="rates" className="flex-1">Current Rates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="market">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketIndices.map((index) => (
                <div key={index.name} className="p-4 border rounded-md">
                  <div className="text-lg font-medium">{index.name}</div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(index.value)}</div>
                  <div className={`text-sm mt-1 ${index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(index.change)} ({formatPercentage(index.changePercent)})
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="returns">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left border">Time Period</th>
                    <th className="p-2 text-left border">Equity</th>
                    <th className="p-2 text-left border">Debt</th>
                    <th className="p-2 text-left border">Gold</th>
                    <th className="p-2 text-left border">Hybrid</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalReturns.map((item) => (
                    <tr key={item.period} className="hover:bg-gray-50">
                      <td className="p-2 border font-medium">{item.period}</td>
                      <td className="p-2 border">{formatPercentage(item.equity)}</td>
                      <td className="p-2 border">{formatPercentage(item.debt)}</td>
                      <td className="p-2 border">{formatPercentage(item.gold)}</td>
                      <td className="p-2 border">{formatPercentage(item.hybrid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="inflation">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Recent Inflation Rates</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {inflationData.slice(0, 5).map((item) => (
                  <div key={item.year} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {item.year}: {item.rate.toFixed(1)}%
                  </div>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left border">Asset Class</th>
                    <th className="p-2 text-left border">Nominal Return (1Y)</th>
                    <th className="p-2 text-left border">Inflation-Adjusted</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalReturns.length > 0 && (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 border font-medium">Equity</td>
                        <td className="p-2 border">{formatPercentage(historicalReturns[0].equity)}</td>
                        <td className="p-2 border">{formatPercentage(getInflationAdjustedReturn(historicalReturns[0].equity))}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 border font-medium">Debt</td>
                        <td className="p-2 border">{formatPercentage(historicalReturns[0].debt)}</td>
                        <td className="p-2 border">{formatPercentage(getInflationAdjustedReturn(historicalReturns[0].debt))}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 border font-medium">Gold</td>
                        <td className="p-2 border">{formatPercentage(historicalReturns[0].gold)}</td>
                        <td className="p-2 border">{formatPercentage(getInflationAdjustedReturn(historicalReturns[0].gold))}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 border font-medium">Hybrid</td>
                        <td className="p-2 border">{formatPercentage(historicalReturns[0].hybrid)}</td>
                        <td className="p-2 border">{formatPercentage(getInflationAdjustedReturn(historicalReturns[0].hybrid))}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Inflation-adjusted returns show the real purchasing power gained after accounting for inflation.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="rates">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentRates.map((rate) => (
                <div key={rate.name} className="p-4 border rounded-md">
                  <div className="text-sm text-gray-500">{rate.name}</div>
                  <div className="text-xl font-bold mt-1">{rate.value.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default RealTimeFinancialData; 