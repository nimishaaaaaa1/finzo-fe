'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock prediction market data (in a real implementation, this would come from an API)
const PREDICTION_MARKET_DATA = {
  scenarios: [
    {
      id: 'bull_market',
      name: 'Bull Market',
      probability: 0.35,
      description: 'Strong economic growth, rising stock prices',
      impact: {
        stocks: 1.2,
        bonds: 0.8,
        realEstate: 1.1,
        crypto: 1.3
      },
      indicators: {
        gdpGrowth: '3.5%',
        inflation: '2.5%',
        unemployment: '4.2%',
        marketSentiment: 'Very Positive'
      }
    },
    {
      id: 'bear_market',
      name: 'Bear Market',
      probability: 0.25,
      description: 'Economic downturn, falling stock prices',
      impact: {
        stocks: 0.7,
        bonds: 1.1,
        realEstate: 0.9,
        crypto: 0.6
      },
      indicators: {
        gdpGrowth: '-1.2%',
        inflation: '4.8%',
        unemployment: '6.5%',
        marketSentiment: 'Very Negative'
      }
    },
    {
      id: 'stagnant',
      name: 'Stagnant Market',
      probability: 0.25,
      description: 'Slow growth, stable prices',
      impact: {
        stocks: 1.0,
        bonds: 1.0,
        realEstate: 1.0,
        crypto: 1.0
      },
      indicators: {
        gdpGrowth: '1.2%',
        inflation: '3.2%',
        unemployment: '5.1%',
        marketSentiment: 'Neutral'
      }
    },
    {
      id: 'volatile',
      name: 'Volatile Market',
      probability: 0.15,
      description: 'High market volatility, mixed performance',
      impact: {
        stocks: 0.9,
        bonds: 1.05,
        realEstate: 0.95,
        crypto: 1.2
      },
      indicators: {
        gdpGrowth: '2.1%',
        inflation: '3.8%',
        unemployment: '5.3%',
        marketSentiment: 'Mixed'
      }
    }
  ]
};

// Investment options
const INVESTMENT_OPTIONS = [
  { id: 'stocks', name: 'Stocks', icon: '📈', description: 'Equity investments' },
  { id: 'bonds', name: 'Bonds', icon: '📊', description: 'Fixed income securities' },
  { id: 'realEstate', name: 'Real Estate', icon: '🏠', description: 'Property investments' },
  { id: 'crypto', name: 'Crypto', icon: '₿', description: 'Cryptocurrency assets' }
];

export default function InvestmentAnalysis() {
  const [selectedInvestments, setSelectedInvestments] = useState<(keyof typeof INVESTMENT_OPTIONS[number]['id'])[]>(['stocks']);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [simulationResults, setSimulationResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Run simulation when inputs change
  useEffect(() => {
    runSimulation();
  }, [selectedInvestments, investmentAmount, timeHorizon]);

  const runSimulation = () => {
    setLoading(true);
    
    // Simulate 1000 scenarios
    const results = [];
    for (let i = 0; i < 1000; i++) {
      // Randomly select a scenario based on probabilities
      const random = Math.random();
      let cumulativeProb = 0;
      let selectedScenario = PREDICTION_MARKET_DATA.scenarios[0];
      
      for (const scenario of PREDICTION_MARKET_DATA.scenarios) {
        cumulativeProb += scenario.probability;
        if (random <= cumulativeProb) {
          selectedScenario = scenario;
          break;
        }
      }

      // Calculate returns for each year
      const yearlyReturns = [];
      let currentValue = investmentAmount;
      
      for (let year = 1; year <= timeHorizon; year++) {
        // Calculate weighted return based on selected investments
        let weightedReturn = 0;
        selectedInvestments.forEach((investment: keyof typeof selectedScenario.impact) => {
          weightedReturn += selectedScenario.impact[investment];
        });
        weightedReturn /= selectedInvestments.length;
        
        // Add some random noise to the return
        const noise = (Math.random() - 0.5) * 0.1;
        const yearReturn = weightedReturn + noise;
        
        currentValue *= yearReturn;
        yearlyReturns.push({
          year,
          value: currentValue
        });
      }
      
      results.push({
        scenario: selectedScenario.id,
        returns: yearlyReturns
      });
    }
    
    // Calculate average returns
    const averageReturns = [];
    for (let year = 1; year <= timeHorizon; year++) {
      const yearValues = results.map(r => r.returns[year - 1].value);
      const avg = yearValues.reduce((a, b) => a + b, 0) / yearValues.length;
      averageReturns.push({
        year,
        value: avg
      });
    }
    
    setSimulationResults(averageReturns);
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toFixed(2)}`;
    }
  };

  return (
    <Card className="p-8 shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50">
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="analysis" className="flex-1">Analysis</TabsTrigger>
          <TabsTrigger value="scenarios" className="flex-1">Scenarios</TabsTrigger>
          <TabsTrigger value="insights" className="flex-1">Insights</TabsTrigger>
          <TabsTrigger value="market-data" className="flex-1">Market Data</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Investment Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">Select Investments</h3>
              <div className="grid grid-cols-2 gap-3">
                {INVESTMENT_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      if (selectedInvestments.includes(option.id)) {
                        setSelectedInvestments(selectedInvestments.filter(id => id !== option.id));
                      } else {
                        setSelectedInvestments([...selectedInvestments, option.id]);
                      }
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedInvestments.includes(option.id)
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                        : 'bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="text-3xl mr-3">{option.icon}</div>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Investment Amount */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Investment Amount</h3>
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-gray-500 mr-2">₹</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full bg-transparent border-none focus:outline-none text-right font-medium"
                  />
                </div>
              </div>

              {/* Time Horizon */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Time Horizon (Years)</h3>
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <input
                    type="number"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(Number(e.target.value))}
                    className="w-full bg-transparent border-none focus:outline-none text-right font-medium"
                  />
                  <span className="text-gray-500 ml-2">years</span>
                </div>
              </div>
            </div>

            {/* Results Visualization */}
            <div>
              <h3 className="text-lg font-medium mb-4">Simulation Results</h3>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationResults}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Portfolio Value" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Key Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Expected Value</div>
                  <div className="text-xl font-bold">
                    {formatCurrency(simulationResults[simulationResults.length - 1]?.value || 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Expected Return</div>
                  <div className="text-xl font-bold">
                    {simulationResults.length > 0 
                      ? `${(((simulationResults[simulationResults.length - 1].value / investmentAmount) - 1) * 100).toFixed(1)}%`
                      : '0%'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <div className="space-y-6">
            {PREDICTION_MARKET_DATA.scenarios.map((scenario) => (
              <div key={scenario.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">{scenario.name}</h3>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${scenario.probability * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-600 font-medium ml-2">
                      {(scenario.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Asset Performance</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(scenario.impact).map(([asset, multiplier]) => (
                        <div key={asset} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {INVESTMENT_OPTIONS.find(opt => opt.id === asset)?.name}
                            </div>
                            <div className={`font-medium ${multiplier >= 1 ? 'text-green-500' : 'text-red-500'}`}>
                              {((multiplier - 1) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Economic Indicators</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(scenario.indicators).map(([indicator, value]) => (
                        <div key={indicator} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 capitalize">
                            {indicator.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="font-medium mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market-data">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-4">Market Sentiment</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">📊</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-500">72%</div>
                    <div className="text-sm text-gray-500">Positive</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-4">Volatility Index</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">📈</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-500">18.5</div>
                    <div className="text-sm text-gray-500">Moderate</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-4">Market Momentum</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">🚀</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-500">+2.3%</div>
                    <div className="text-sm text-gray-500">Weekly</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Real-time Market Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">24h Change</th>
                      <th className="pb-3">Volume</th>
                      <th className="pb-3">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3">NIFTY 50</td>
                      <td className="py-3">₹22,150.35</td>
                      <td className="py-3 text-green-500">+1.2%</td>
                      <td className="py-3">₹45.2B</td>
                      <td className="py-3">₹2.1T</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3">SENSEX</td>
                      <td className="py-3">₹73,128.77</td>
                      <td className="py-3 text-green-500">+1.1%</td>
                      <td className="py-3">₹38.7B</td>
                      <td className="py-3">₹1.8T</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3">Gold</td>
                      <td className="py-3">₹62,450/g</td>
                      <td className="py-3 text-red-500">-0.3%</td>
                      <td className="py-3">₹2.1B</td>
                      <td className="py-3">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Risk Assessment</h3>
              <p className="text-gray-700">
                Based on the selected investments and prediction market probabilities, your portfolio has a:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>35% chance of outperforming the market</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span>40% chance of moderate performance</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  <span>25% chance of underperforming</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-green-800 mb-3">Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Consider diversifying across more asset classes to reduce risk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Monitor prediction market probabilities regularly for scenario updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Rebalance portfolio quarterly based on updated scenario probabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 