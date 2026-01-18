import { useState } from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { CoinMascot } from '../components/Coin'
import { SegmentedControl } from '../components/Control'
import { CategorySelector, type CategoryId } from '../components/Category'
interface AddTransactionProps {
  onBack: () => void
}
export function AddTransaction({ onBack }: AddTransactionProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<CategoryId>('food')
  const handleSave = () => {
    onBack()
  }
  const themeColor = type === 'income' ? 'text-emerald-500' : 'text-blue-500'
  const buttonColor =
    type === 'income'
      ? 'bg-emerald-400 hover:bg-emerald-500 shadow-emerald-200'
      : 'bg-blue-400 hover:bg-blue-500 shadow-blue-200'
  return (
    <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans md:flex md:items-center md:justify-center transition-colors">
      <main className="w-full max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen md:min-h-0 md:h-auto md:bg-white md:rounded-[2.5rem] md:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] md:border md:border-gray-100 md:p-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
            <CoinMascot size={32} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              New Record
            </span>
          </div>
          <div className="w-10" /> {/* Spacer for balance */}
        </header>

        {/* Type Toggle */}
        <div className="mb-10">
          <SegmentedControl value={type} onChange={setType} />
        </div>

        {/* Amount Input */}
        <div className="mb-12 text-center">
          <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
            Amount
          </label>
          <div className="relative inline-block">
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold ${themeColor} opacity-50`}
            >
              ฿
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`
                w-full bg-transparent text-center text-6xl font-bold outline-none placeholder-gray-200
                ${themeColor}
              `}
              autoFocus
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex-1 md:flex-none">
          <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
            Select Category
          </h3>
          <CategorySelector
            selected={category}
            onSelect={setCategory}
            type={type}
          />
        </div>

        {/* Date & Note (Optional Polish) */}
        <div className="mt-8 mb-8 space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="font-medium">Today, Aug 24</span>
            </div>
            <span className="text-xs font-bold text-blue-500">Change</span>
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`
            w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-95
            ${buttonColor}
          `}
        >
          Save Record
        </button>
      </main>
    </div>
  )
}
