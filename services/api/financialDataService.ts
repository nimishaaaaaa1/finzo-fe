import axios from 'axios';

// API keys and endpoints would typically be in environment variables
const API_KEYS = {
  MARKET_DATA: process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY || 'demo',
};

// Types for financial data
export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export interface HistoricalReturn {
  period: string;
  equity: number;
  debt: number;
  gold: number;
  hybrid: number;
}

export interface CurrentRate {
  name: string;
  value: number;
  lastUpdated: string;
}

export interface InflationData {
  year: number;
  rate: number;
}

// Mock data (would be replaced with actual API calls)
const mockMarketIndices: MarketIndex[] = [
  { name: 'NIFTY 50', value: 22462.15, change: 123.45, changePercent: 0.55, lastUpdated: '2023-06-01T15:30:00Z' },
  { name: 'SENSEX', value: 73882.91, change: 354.21, changePercent: 0.48, lastUpdated: '2023-06-01T15:30:00Z' },
  { name: 'NIFTY BANK', value: 48236.70, change: -45.30, changePercent: -0.09, lastUpdated: '2023-06-01T15:30:00Z' },
  { name: 'NIFTY MIDCAP 100', value: 48236.70, change: 156.78, changePercent: 0.33, lastUpdated: '2023-06-01T15:30:00Z' },
];

const mockHistoricalReturns: HistoricalReturn[] = [
  { period: '1 Year', equity: 12.5, debt: 6.8, gold: 8.2, hybrid: 9.5 },
  { period: '3 Years', equity: 15.2, debt: 7.1, gold: 9.5, hybrid: 11.3 },
  { period: '5 Years', equity: 14.8, debt: 7.5, gold: 10.2, hybrid: 11.8 },
  { period: '10 Years', equity: 13.5, debt: 7.8, gold: 8.9, hybrid: 10.5 },
];

const mockCurrentRates: CurrentRate[] = [
  { name: 'Repo Rate', value: 6.5, lastUpdated: '2023-05-15T00:00:00Z' },
  { name: 'Reverse Repo Rate', value: 3.35, lastUpdated: '2023-05-15T00:00:00Z' },
  { name: 'SBI FD (5yr)', value: 6.75, lastUpdated: '2023-06-01T00:00:00Z' },
  { name: 'PPF', value: 7.1, lastUpdated: '2023-04-01T00:00:00Z' },
  { name: 'NSC', value: 7.7, lastUpdated: '2023-04-01T00:00:00Z' },
];

const mockInflationData: InflationData[] = [
  { year: 2023, rate: 5.4 },
  { year: 2022, rate: 6.7 },
  { year: 2021, rate: 5.1 },
  { year: 2020, rate: 6.2 },
  { year: 2019, rate: 4.8 },
];

// Service functions
export const financialDataService = {
  // Get market indices
  getMarketIndices: async (): Promise<MarketIndex[]> => {
    try {
      // In a real implementation, this would be an API call
      // const response = await axios.get(`https://api.example.com/market-indices?apiKey=${API_KEYS.MARKET_DATA}`);
      // return response.data;
      
      return mockMarketIndices;
    } catch (error) {
      console.error('Error fetching market indices:', error);
      throw error;
    }
  },

  // Get historical returns for different asset classes
  getHistoricalReturns: async (): Promise<HistoricalReturn[]> => {
    try {
      // In a real implementation, this would be an API call
      // const response = await axios.get(`https://api.example.com/historical-returns?apiKey=${API_KEYS.MARKET_DATA}`);
      // return response.data;
      
      return mockHistoricalReturns;
    } catch (error) {
      console.error('Error fetching historical returns:', error);
      throw error;
    }
  },

  // Get current interest rates and investment returns
  getCurrentRates: async (): Promise<CurrentRate[]> => {
    try {
      // In a real implementation, this would be an API call
      // const response = await axios.get(`https://api.example.com/current-rates?apiKey=${API_KEYS.MARKET_DATA}`);
      // return response.data;
      
      return mockCurrentRates;
    } catch (error) {
      console.error('Error fetching current rates:', error);
      throw error;
    }
  },

  // Get inflation data
  getInflationData: async (): Promise<InflationData[]> => {
    try {
      // In a real implementation, this would be an API call
      // const response = await axios.get(`https://api.example.com/inflation-data?apiKey=${API_KEYS.MARKET_DATA}`);
      // return response.data;
      
      return mockInflationData;
    } catch (error) {
      console.error('Error fetching inflation data:', error);
      throw error;
    }
  },

  // Calculate returns for different time horizons
  calculateReturnsForTimeHorizons: (
    initialAmount: number,
    monthlyContribution: number,
    interestRate: number,
    timeHorizons: number[] = [1, 5, 10, 15, 20]
  ) => {
    return timeHorizons.map(years => {
      const months = years * 12;
      const monthlyRate = interestRate / 100 / 12;
      
      // Calculate future value for lump sum
      const lumpSumFV = initialAmount * Math.pow(1 + monthlyRate, months);
      
      // Calculate future value for SIP (monthly contributions)
      let sipFV = 0;
      if (monthlyRate > 0) {
        sipFV = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      } else {
        sipFV = monthlyContribution * months;
      }
      
      // Total future value
      const totalFV = lumpSumFV + sipFV;
      
      // Total investment
      const totalInvestment = initialAmount + (monthlyContribution * months);
      
      // Interest earned
      const interestEarned = totalFV - totalInvestment;
      
      // Growth multiple
      const growthMultiple = totalFV / totalInvestment;
      
      return {
        years,
        totalFV,
        totalInvestment,
        interestEarned,
        growthMultiple
      };
    });
  },

  // Calculate inflation-adjusted returns
  calculateInflationAdjustedReturns: (
    nominalReturn: number,
    inflationRate: number
  ): number => {
    // Real return formula: ((1 + nominal) / (1 + inflation)) - 1
    return (((1 + nominalReturn / 100) / (1 + inflationRate / 100)) - 1) * 100;
  },

  // Get average returns for investment types
  getAverageReturnsForInvestmentTypes: (): Record<string, number> => {
    return {
      'Fixed Deposit': 6.5,
      'PPF': 7.1,
      'ELSS': 12.5,
      'Index Fund': 13.2,
      'Gold': 8.5,
      'Real Estate': 9.8,
      'Corporate Bond': 7.8,
      'Government Bond': 7.2,
    };
  }
};

export default financialDataService; 