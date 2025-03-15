'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { debounce } from 'lodash';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeHorizonProjections from './TimeHorizonProjections';
import InvestmentEducation from './InvestmentEducation';
import financialDataService from '@/services/api/financialDataService';

// Define investment types with their average annual returns
const INVESTMENT_TYPES = [
  { id: 'mutual', name: 'Mutual Funds', avgReturn: 12.5, icon: '📊', description: '12.5% avg. return' },
  { id: 'stocks', name: 'Stocks', avgReturn: 13.2, icon: '📈', description: '13.2% avg. return' },
  { id: 'fixed', name: 'Fixed Deposits', avgReturn: 6.5, icon: '🏦', description: '6.5% avg. return' },
  { id: 'ppf', name: 'PPF', avgReturn: 7.1, icon: '🏛️', description: '7.1% avg. return' },
  { id: 'government', name: 'Government Bonds', avgReturn: 7.2, icon: '📜', description: '7.2% avg. return' },
  { id: 'corporate', name: 'Corporate Bonds', avgReturn: 7.8, icon: '💼', description: '7.8% avg. return' },
  { id: 'gold', name: 'Gold', avgReturn: 8.5, icon: '🪙', description: '8.5% avg. return' },
  { id: 'real_estate', name: 'Real Estate', avgReturn: 9.8, icon: '🏠', description: '9.8% avg. return' },
];

export default function InvestmentCalculator() {
  // State for form inputs
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [years, setYears] = useState<number>(10);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(INVESTMENT_TYPES[0]);
  const [interestRate, setInterestRate] = useState<number>(INVESTMENT_TYPES[0].avgReturn);
  
  // State for calculation results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);

  // Update interest rate when investment type changes
  useEffect(() => {
    setInterestRate(selectedInvestmentType.avgReturn);
  }, [selectedInvestmentType]);

  // Debounced setters for slider inputs to reduce calculation frequency
  const debouncedSetInitialAmount = useCallback(
    debounce((value: number) => setInitialAmount(value), 50),
    []
  );

  const debouncedSetMonthlyContribution = useCallback(
    debounce((value: number) => setMonthlyContribution(value), 50),
    []
  );

  const debouncedSetYears = useCallback(
    debounce((value: number) => setYears(value), 50),
    []
  );

  // Calculate investment returns
  useEffect(() => {
    // Validate inputs
    if (initialAmount < 0 || monthlyContribution < 0 || years <= 0 || interestRate < 0) {
      return;
    }

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    
    // Calculate future value using compound interest formula
    // For initial amount: P(1 + r)^n
    const initialAmountFutureValue = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
    
    // For monthly contributions: PMT * (((1 + r)^n - 1) / r)
    const monthlyContributionFutureValue = 
      monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    // Total future value
    const calculatedFutureValue = initialAmountFutureValue + monthlyContributionFutureValue;
    
    // Total investment
    const calculatedTotalInvestment = initialAmount + (monthlyContribution * totalMonths);
    
    // Interest earned
    const calculatedInterestEarned = calculatedFutureValue - calculatedTotalInvestment;

    setFutureValue(calculatedFutureValue);
    setTotalInvestment(calculatedTotalInvestment);
    setInterestEarned(calculatedInterestEarned);
  }, [initialAmount, monthlyContribution, years, interestRate]);

  // Format currency - memoized to avoid recalculation
  const formatCurrency = useCallback((amount: number) => {
    if (amount >= 10000000) { // 1 crore or more
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) { // 1 lakh or more
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toFixed(2)}`;
    }
  }, []);

  // Generate data points for the chart - memoized to avoid recalculation
  const chartData = useMemo(() => {
    const dataPoints = [];
    const monthlyRate = interestRate / 100 / 12;
    
    // Reduce number of data points for better performance
    const yearStep = years <= 10 ? 1 : 2;
    
    for (let year = 0; year <= years; year += yearStep) {
      const monthsElapsed = year * 12;
      
      // Calculate investment amount (principal)
      const investedAmount = initialAmount + (monthlyContribution * monthsElapsed);
      
      // Calculate future value with compound interest
      const initialAmountFutureValue = initialAmount * Math.pow(1 + monthlyRate, monthsElapsed);
      const monthlyContributionFutureValue = 
        monthlyContribution * ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) * (1 + monthlyRate);
      
      const totalValue = initialAmountFutureValue + monthlyContributionFutureValue;
      
      dataPoints.push({
        year,
        investedAmount,
        totalValue
      });
    }
    
    return dataPoints;
  }, [initialAmount, monthlyContribution, years, interestRate]);

  // Memoize max value calculation
  const maxValue = useMemo(() => 
    Math.max(...chartData.map(d => d.totalValue)), 
    [chartData]
  );

  // Memoize chart paths to avoid recalculation during render
  const chartPaths = useMemo(() => {
    const totalValuePath = `M0,100 ${chartData.map((d, i) => 
      `L${(i / (chartData.length - 1)) * 100},${100 - (d.totalValue / maxValue) * 100}`
    ).join(' ')} L100,100 Z`;
    
    const totalValueLine = chartData.map((d, i) => 
      `${(i / (chartData.length - 1)) * 100},${100 - (d.totalValue / maxValue) * 100}`
    ).join(' ');
    
    const investedAmountLine = chartData.map((d, i) => 
      `${(i / (chartData.length - 1)) * 100},${100 - (d.investedAmount / maxValue) * 100}`
    ).join(' ');
    
    return { totalValuePath, totalValueLine, investedAmountLine };
  }, [chartData, maxValue]);

  // Handle slider input changes
  const handleInitialAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Update the UI immediately for the slider position
    e.target.value = value.toString();
    // Debounce the actual state update
    debouncedSetInitialAmount(value);
  }, [debouncedSetInitialAmount]);

  const handleMonthlyContributionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    e.target.value = value.toString();
    debouncedSetMonthlyContribution(value);
  }, [debouncedSetMonthlyContribution]);

  const handleYearsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    e.target.value = value.toString();
    debouncedSetYears(value);
  }, [debouncedSetYears]);

  // Memoize principal and interest percentages
  const { principalPercentage, interestPercentage } = useMemo(() => {
    const principalPercentage = ((totalInvestment / futureValue) * 100) || 0;
    const interestPercentage = ((interestEarned / futureValue) * 100) || 0;
    return { principalPercentage, interestPercentage };
  }, [totalInvestment, interestEarned, futureValue]);

  return (
    <div className="font-sans">
      <Card className="p-8 shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50">
        {/* Header */}
        <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4 shadow-sm">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Investment Calculator</h2>
        </div>
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="calculator" className="flex-1">Calculator</TabsTrigger>
            <TabsTrigger value="projections" className="flex-1">Projections</TabsTrigger>
            <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column - Inputs */}
              <div>
                {/* Investment Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-gray-700">Investment Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {INVESTMENT_TYPES.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setSelectedInvestmentType(type)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedInvestmentType.id === type.id
                            ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                            : 'bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-3">{type.icon}</div>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-gray-500">{type.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Input Sliders - Enhanced Design */}
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-gray-700 font-medium">Initial Investment</label>
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md shadow-sm">
                        <span className="text-gray-500 mr-1">₹</span>
                        <input
                          type="number"
                          value={initialAmount}
                          onChange={(e) => setInitialAmount(Number(e.target.value))}
                          className="w-24 bg-transparent border-none focus:outline-none text-right font-medium"
                        />
                      </div>
                    </div>
                    <div className="relative h-2 mt-4 group">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div 
                        className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-150 ease-out"
                        style={{ width: `${((initialAmount - 1000) / (10000000 - 1000)) * 100}%` }}
                      ></div>
                      <input
                        type="range"
                        min={1000}
                        max={10000000}
                        step={1000}
                        value={initialAmount}
                        onChange={handleInitialAmountChange}
                        className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
                          [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-md 
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                          hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-105
                          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 
                          [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-md
                          [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
                          hover:[&::-moz-range-thumb]:scale-110 active:[&::-moz-range-thumb]:scale-105"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>₹1,000</span>
                      <span>₹1 Cr</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-gray-700 font-medium">Monthly Contribution</label>
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md shadow-sm">
                        <span className="text-gray-500 mr-1">₹</span>
                        <input
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          className="w-24 bg-transparent border-none focus:outline-none text-right font-medium"
                        />
                      </div>
                    </div>
                    <div className="relative h-2 mt-4 group">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div 
                        className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-150 ease-out"
                        style={{ width: `${(monthlyContribution / 100000) * 100}%` }}
                      ></div>
                      <input
                        type="range"
                        min={0}
                        max={100000}
                        step={100}
                        value={monthlyContribution}
                        onChange={handleMonthlyContributionChange}
                        className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
                          [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-md 
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                          hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-105
                          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 
                          [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-md
                          [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
                          hover:[&::-moz-range-thumb]:scale-110 active:[&::-moz-range-thumb]:scale-105"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>₹0</span>
                      <span>₹1 Lakh</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-gray-700 font-medium">Investment Period</label>
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md shadow-sm">
                        <input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-16 bg-transparent border-none focus:outline-none text-right font-medium"
                        />
                        <span className="text-gray-500 ml-1">years</span>
                      </div>
                    </div>
                    <div className="relative h-2 mt-4 group">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div 
                        className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-150 ease-out"
                        style={{ width: `${((years - 1) / 29) * 100}%` }}
                      ></div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        step={1}
                        value={years}
                        onChange={handleYearsChange}
                        className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
                          [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-md 
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                          hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-105
                          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 
                          [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-md
                          [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
                          hover:[&::-moz-range-thumb]:scale-110 active:[&::-moz-range-thumb]:scale-105"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Results */}
              <div>
                {/* Chart - Sleek and Elegant Design */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-50/30 p-6 rounded-xl mb-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Investment Growth</h3>
                  
                  <div className="h-72 relative mt-4">
                    <div className="absolute inset-0">
                      {/* Y-axis labels */}
                      <div className="absolute -left-2 top-0 text-xs font-medium text-gray-600">
                        {formatCurrency(maxValue)}
                      </div>
                      <div className="absolute -left-2 bottom-0 text-xs font-medium text-gray-600">
                        0
                      </div>
                      
                      {/* Chart grid - more subtle and elegant */}
                      <div className="absolute inset-0 border-b border-l border-gray-200/50">
                        {/* Horizontal grid lines - more subtle */}
                        {[0.25, 0.5, 0.75].map((ratio) => (
                          <div 
                            key={ratio}
                            className="absolute w-full border-t border-gray-100/50"
                            style={{ top: `${ratio * 100}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Chart area - Sleek and elegant rendering */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Enhanced gradients */}
                        <defs>
                          <linearGradient id="totalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                          </linearGradient>
                          <linearGradient id="investedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                          </linearGradient>
                          {/* Add drop shadow for lines */}
                          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                            <feOffset dx="0" dy="1" result="offsetblur" />
                            <feComponentTransfer>
                              <feFuncA type="linear" slope="0.2" />
                            </feComponentTransfer>
                            <feMerge>
                              <feMergeNode />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        
                        {/* Area under invested amount line */}
                        <path
                          d={`M0,100 ${chartPaths.investedAmountLine} L100,100 Z`}
                          fill="url(#investedGradient)"
                        />
                        
                        {/* Area under total value line */}
                        <path
                          d={chartPaths.totalValuePath}
                          fill="url(#totalGradient)"
                        />
                        
                        {/* Invested Amount Line - smoother with filter */}
                        <polyline
                          points={chartPaths.investedAmountLine}
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#dropShadow)"
                        />
                        
                        {/* Total Value Line - smoother with filter */}
                        <polyline
                          points={chartPaths.totalValueLine}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#dropShadow)"
                        />
                        
                        {/* Data points - Elegant styling */}
                        {chartData.map((d, i) => (
                          <React.Fragment key={i}>
                            {/* Only render data points for start, end, and every 3rd point in between for better performance */}
                            {(i === 0 || i === chartData.length - 1 || i % 3 === 0) && (
                              <>
                                {/* Total Value data point - minimal and subtle */}
                                <circle
                                  cx={`${(i / (chartData.length - 1)) * 100}`}
                                  cy={`${100 - (d.totalValue / maxValue) * 100}`}
                                  r="2"
                                  fill="#10B981"
                                  stroke="#fff"
                                  strokeWidth="1"
                                />
                                
                                {/* Invested Amount data point - minimal and subtle */}
                                <circle
                                  cx={`${(i / (chartData.length - 1)) * 100}`}
                                  cy={`${100 - (d.investedAmount / maxValue) * 100}`}
                                  r="2"
                                  fill="#3B82F6"
                                  stroke="#fff"
                                  strokeWidth="1"
                                />
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </svg>
                      
                      {/* X-axis labels - Elegant styling */}
                      <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600 font-medium">
                        {chartData.filter((_, i) => 
                          i === 0 || i === chartData.length - 1 || i === Math.floor(chartData.length / 2)
                        ).map((d, i) => (
                          <div key={i} style={{ 
                            left: i === 0 ? '0%' : 
                                  i === 1 ? '50%' : 
                                  '100%',
                            transform: i === 1 ? 'translateX(-50%)' : 'none'
                          }}
                          className="bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
                            Year {d.year}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend - Elegant styling */}
                  <div className="flex justify-center mt-4 text-sm">
                    <div className="flex items-center mr-8 bg-white/70 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2 shadow-sm"></div>
                      <span className="font-medium text-gray-700">Total Value</span>
                    </div>
                    <div className="flex items-center bg-white/70 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 shadow-sm"></div>
                      <span className="font-medium text-gray-700">Invested Amount</span>
                    </div>
                  </div>
                </div>
                
                {/* Results */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Future Value</div>
                      <div className="text-xl font-bold">{formatCurrency(futureValue)}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Total Investment</div>
                      <div className="text-xl font-bold">{formatCurrency(totalInvestment)}</div>
                    </div>
                  </div>
                  
                  {/* Interest Earned - Enhanced Design */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-5 rounded-xl border border-green-100 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-green-600">Interest Earned</span>
                      <span className="text-3xl font-bold text-green-600">{formatCurrency(interestEarned)}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200 relative">
                      <div 
                        className="h-full bg-blue-500 absolute left-0" 
                        style={{ width: `${principalPercentage}%` }}
                      ></div>
                      <div 
                        className="h-full bg-green-500 absolute left-0" 
                        style={{ left: `${principalPercentage}%`, width: `${interestPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">Principal ({principalPercentage.toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">Interest ({interestPercentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projections">
            <TimeHorizonProjections 
              initialAmount={initialAmount}
              monthlyContribution={monthlyContribution}
              interestRate={interestRate}
            />
          </TabsContent>
          
          <TabsContent value="education">
            <InvestmentEducation />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
} 