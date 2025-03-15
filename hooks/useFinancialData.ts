import { useState, useEffect } from 'react';
import financialDataService, { 
  MarketIndex, 
  HistoricalReturn, 
  CurrentRate, 
  InflationData 
} from '@/services/api/financialDataService';

interface FinancialDataState {
  marketIndices: MarketIndex[];
  historicalReturns: HistoricalReturn[];
  currentRates: CurrentRate[];
  inflationData: InflationData[];
  averageReturns: Record<string, number>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useFinancialData() {
  const [state, setState] = useState<FinancialDataState>({
    marketIndices: [],
    historicalReturns: [],
    currentRates: [],
    inflationData: [],
    averageReturns: {},
    loading: true,
    error: null,
    lastUpdated: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [
        marketIndices,
        historicalReturns,
        currentRates,
        inflationData
      ] = await Promise.all([
        financialDataService.getMarketIndices(),
        financialDataService.getHistoricalReturns(),
        financialDataService.getCurrentRates(),
        financialDataService.getInflationData()
      ]);
      
      const averageReturns = financialDataService.getAverageReturnsForInvestmentTypes();
      
      setState({
        marketIndices,
        historicalReturns,
        currentRates,
        inflationData,
        averageReturns,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error fetching financial data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch financial data. Please try again later.'
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate inflation-adjusted returns for a given nominal return
  const getInflationAdjustedReturn = (nominalReturn: number): number => {
    if (state.inflationData.length === 0) return nominalReturn;
    
    // Use the most recent inflation rate
    const latestInflation = state.inflationData[0].rate;
    return financialDataService.calculateInflationAdjustedReturns(nominalReturn, latestInflation);
  };

  // Get average inflation rate for the last N years
  const getAverageInflationRate = (years: number = 5): number => {
    if (state.inflationData.length === 0) return 0;
    
    const recentInflation = state.inflationData.slice(0, Math.min(years, state.inflationData.length));
    const sum = recentInflation.reduce((acc, item) => acc + item.rate, 0);
    return sum / recentInflation.length;
  };

  // Calculate returns for different time horizons
  const calculateProjections = (
    initialAmount: number,
    monthlyContribution: number,
    interestRate: number,
    timeHorizons: number[] = [1, 5, 10, 15, 20]
  ) => {
    return financialDataService.calculateReturnsForTimeHorizons(
      initialAmount,
      monthlyContribution,
      interestRate,
      timeHorizons
    );
  };

  return {
    ...state,
    refreshData: fetchData,
    getInflationAdjustedReturn,
    getAverageInflationRate,
    calculateProjections
  };
}

export default useFinancialData; 