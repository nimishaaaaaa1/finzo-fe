import { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(0)
  const [rate, setRate] = useState<number>(18)
  const [isInclusive, setIsInclusive] = useState<boolean>(false)
  const [isInterState, setIsInterState] = useState<boolean>(false)

  // Calculate tax breakdown in real-time
  const breakdown = useMemo(() => {
    if (!amount) {
      return {
        baseAmount: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        totalAmount: 0
      }
    }

    let baseAmount: number
    let totalTax: number

    if (isInclusive) {
      // If amount includes GST, calculate backwards
      baseAmount = amount / (1 + (rate / 100))
      totalTax = amount - baseAmount
    } else {
      // If amount excludes GST
      baseAmount = amount
      totalTax = amount * (rate / 100)
    }

    // Split tax into CGST/SGST or IGST based on transaction type
    const igst = isInterState ? totalTax : 0
    const cgst = !isInterState ? totalTax / 2 : 0
    const sgst = !isInterState ? totalTax / 2 : 0
    const totalAmount = baseAmount + totalTax

    return {
      baseAmount,
      cgst,
      sgst,
      igst,
      totalAmount
    }
  }, [amount, rate, isInclusive, isInterState])

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Calculate GST</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Rate
              </label>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={5}>5% - Essential items</option>
                <option value={12}>12% - Standard rate</option>
                <option value={18}>18% - Standard rate</option>
                <option value={28}>28% - Luxury items</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isInclusive}
                  onChange={(e) => setIsInclusive(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Amount includes GST</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isInterState}
                  onChange={(e) => setIsInterState(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Inter-state transaction (IGST)</span>
              </label>
            </div>
          </div>

          {/* Right Column - Tax Breakdown */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Tax Breakdown</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-blue-100">
                <span className="text-gray-600">Base Amount</span>
                <span className="font-medium">₹{breakdown.baseAmount.toFixed(2)}</span>
              </div>

              {isInterState ? (
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-gray-600">IGST ({rate}%)</span>
                  <span className="font-medium">₹{breakdown.igst.toFixed(2)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-blue-100">
                    <span className="text-gray-600">CGST ({rate/2}%)</span>
                    <span className="font-medium">₹{breakdown.cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-blue-100">
                    <span className="text-gray-600">SGST ({rate/2}%)</span>
                    <span className="font-medium">₹{breakdown.sgst.toFixed(2)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-3">
                <span className="font-semibold">Total Amount</span>
                <span className="font-semibold text-lg">₹{breakdown.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
