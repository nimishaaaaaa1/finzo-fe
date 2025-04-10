import { InvestmentSimulator } from '@/components/calculators/investment/InvestmentSimulator';

export default function InvestmentSimulationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investment Decision Simulator</h1>
      <p className="text-gray-600 mb-8">
        Analyze investment decisions using prediction market data to simulate future scenarios and their probabilities.
      </p>
      <div className="bg-gray-100 p-4 rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-2">What are Prediction Markets?</h2>
        <p className="text-gray-700">
          Prediction markets are exchange-traded markets created for the purpose of trading the outcome of events. They are used to forecast the probability of various outcomes by aggregating the beliefs of participants. These markets can provide valuable insights into future events, making them a powerful tool for investment decision-making.
        </p>
      </div>
      <InvestmentSimulator />
    </div>
  );
} 