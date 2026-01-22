import { useState } from 'react'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { CoinMascot } from '../components/Coin'
import { SegmentedControl } from '../components/Control'
import { CategorySelector, type CategoryId } from '../components/Category'
import { transactionService } from '../services/transaction.service'
import type { ApiError } from '../types/auth.types'

interface AddTransactionProps {
  onBack: () => void
}

export function AddTransaction({ onBack }: AddTransactionProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<CategoryId>('food')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!amount || !title) {
      setError('Please fill in amount and title')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      await transactionService.createTransaction({
        type,
        category,
        title,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
      })
      onBack()
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to save transaction')
    } finally {
      setIsLoading(false)
    }
  }

  const themeColor = type === 'income' ? 'text-emerald-500' : 'text-blue-500'
  const buttonColor =
    type === 'income'
      ? 'bg-emerald-400 hover:bg-emerald-500 shadow-emerald-200'
      : 'bg-blue-400 hover:bg-blue-500 shadow-blue-200'

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans transition-colors">
      <div className="min-h-screen flex items-center justify-center p-0 md:p-6">
        <main className="w-full max-w-md md:max-w-4xl mx-auto px-6 py-8 flex flex-col min-h-screen md:min-h-0 md:h-auto md:bg-white md:rounded-[2.5rem] md:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] md:border md:border-gray-100 md:p-12 z-10 relative">
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
            <div className="w-10" />
          </header>

          <div className="flex-1 md:grid md:grid-cols-2 md:gap-12">
            {/* Left Column: Core Details */}
            <div className="flex flex-col space-y-8">
              {/* Type Toggle */}
              <div className="w-full">
                <SegmentedControl value={type} onChange={setType} />
              </div>

              {/* Amount Input */}
              <div className="text-center md:text-left">
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Amount
                </label>
                <div className="relative inline-block w-full">
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
                        w-full bg-transparent text-center md:text-left md:pl-10 text-6xl font-bold outline-none placeholder-gray-200
                        ${themeColor}
                    `}
                    autoFocus
                  />
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                  Notes
                </label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" size={20} />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                  Transaction Date
                </label>
                <div className="relative">
                  <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-gray-400" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-gray-900">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">Change</span>
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Categories & Submit */}
            <div className="flex flex-col pt-8 md:pt-0">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">
                  Select Category
                </h3>
                <CategorySelector
                  selected={category}
                  onSelect={setCategory}
                  type={type}
                />
              </div>

              <div className="mt-12 space-y-4">
                {error && (
                  <div className="text-center">
                    <p className="text-sm text-red-500 font-medium bg-red-50 py-2 rounded-xl border border-red-100">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`
                      w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl transition-all active:scale-[0.98] hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed
                      ${buttonColor}
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : 'Save Transaction'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
