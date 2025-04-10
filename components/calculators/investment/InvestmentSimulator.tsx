'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PredictionMarketData {
  id: string;
  question: string;
  probability: number;
  lastUpdated: string;
  source: string;
}

interface SimulationResult {
  scenario: string;
  probability: number;
  expectedReturn: number;
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}

export function InvestmentSimulator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [predictionMarkets, setPredictionMarkets] = useState<PredictionMarketData[]>([]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock prediction market data - in production, this would come from an API
  useEffect(() => {
    const mockData: PredictionMarketData[] = [
      {
        id: '1',
        question: 'Will the S&P 500 increase by more than 15% in 2025?',
        probability: 0.70,
        lastUpdated: '2025-03-20',
        source: 'Polymarket'
      },
      {
        id: '2',
        question: 'Will the Fed cut rates by more than 75 basis points in 2025?',
        probability: 0.55,
        lastUpdated: '2025-03-20',
        source: 'Manifold'
      },
      // Add more prediction market data
    ];
    setPredictionMarkets(mockData);
  }, []);

  // Mock additional data
  const marketTrends = [
    { name: 'Dow Jones', value: '+0.5%' },
    { name: 'NASDAQ', value: '-0.3%' },
  ];

  const economicIndicators = [
    { name: 'Inflation Rate', value: '3.2%' },
    { name: 'GDP Growth', value: '2.5%' },
  ];

  const newsHighlights = [
    'Fed announces new monetary policy measures.',
    'Tech stocks rally amid market optimism.',
  ];

  const runSimulation = () => {
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      const results: SimulationResult[] = [
        {
          scenario: 'Bull Market',
          probability: 0.4,
          expectedReturn: 0.15,
          riskMetrics: {
            volatility: 0.12,
            sharpeRatio: 1.2,
            maxDrawdown: 0.15
          }
        },
        {
          scenario: 'Bear Market',
          probability: 0.2,
          expectedReturn: -0.1,
          riskMetrics: {
            volatility: 0.18,
            sharpeRatio: -0.8,
            maxDrawdown: 0.25
          }
        },
        {
          scenario: 'Sideways Market',
          probability: 0.4,
          expectedReturn: 0.05,
          riskMetrics: {
            volatility: 0.08,
            sharpeRatio: 0.6,
            maxDrawdown: 0.1
          }
        }
      ];
      setSimulationResults(results);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {marketTrends.map((trend, index) => (
              <li key={index} className="flex justify-between">
                <span>{trend.name}</span>
                <span>{trend.value}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Economic Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {economicIndicators.map((indicator, index) => (
              <li key={index} className="flex justify-between">
                <span>{indicator.name}</span>
                <span>{indicator.value}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>News Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {newsHighlights.map((news, index) => (
              <li key={index}>{news}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Initial Investment (₹)</Label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Horizon (Years)</Label>
              <Slider
                value={[timeHorizon]}
                onValueChange={([value]) => setTimeHorizon(value)}
                min={1}
                max={20}
                step={1}
              />
              <div className="text-sm text-gray-500">{timeHorizon} years</div>
            </div>
            <div className="space-y-2">
              <Label>Asset Class</Label>
              <Select value={selectedAsset} onValueChange={(value) => setSelectedAsset(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="fixed-income">Fixed Income</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={runSimulation} disabled={loading}>
            {loading ? 'Running Simulation...' : 'Run Simulation'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictionMarkets.map((market) => (
              <div key={market.id} className="border rounded-lg p-4">
                <div className="font-medium">{market.question}</div>
                <div className="text-sm text-gray-500">
                  Probability: {(market.probability * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">
                  Source: {market.source} • Last updated: {market.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {simulationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={simulationResults.map((result) => ({
                      name: result.scenario,
                      probability: result.probability * 100,
                      return: result.expectedReturn * 100
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="probability" stroke="#8884d8" />
                    <Line type="monotone" dataKey="return" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {simulationResults.map((result) => (
                  <Card key={result.scenario}>
                    <CardHeader>
                      <CardTitle className="text-lg">{result.scenario}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Probability: </span>
                          {(result.probability * 100).toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Expected Return: </span>
                          {(result.expectedReturn * 100).toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Volatility: </span>
                          {(result.riskMetrics.volatility * 100).toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Sharpe Ratio: </span>
                          {result.riskMetrics.sharpeRatio.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Max Drawdown: </span>
                          {(result.riskMetrics.maxDrawdown * 100).toFixed(1)}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 