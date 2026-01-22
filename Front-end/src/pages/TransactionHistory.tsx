import React, { useEffect, useState } from 'react'
import { CoinMascot } from '../components/Coin'
import { BottomNav } from '../components/BottomNav'
import { transactionService } from '../services/transaction.service'
import { summaryService } from '../services/summary.service'
import type { Transaction as ApiTransaction } from '../types/transaction.types'
import type { FinancialSummary } from '../types/summary.types'
import {
  Utensils,
  Bus,
  ShoppingBag,
  Briefcase,
  Film,
  Receipt,
  HeartPulse,
  MoreHorizontal,
  TrendingUp,
  Gift,
} from 'lucide-react'

interface TransactionHistoryProps {
  onHomeClick?: () => void
  onAddClick?: () => void
  onLogout?: () => void
}

type TransactionType = 'income' | 'expense'
type CategoryId =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'salary'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'other'
  | 'freelance'
  | 'investment'

// UI Transaction Interface (slightly different from API)
interface Transaction {
  id: string
  type: TransactionType
  category: CategoryId
  title: string
  amount: number
  time: string
}

interface TransactionGroup {
  date: string
  transactions: Transaction[]
}

const categoryIcons: Record<string, React.ElementType> = {
  food: Utensils,
  transport: Bus,
  shopping: ShoppingBag,
  salary: Briefcase,
  entertainment: Film,
  bills: Receipt,
  health: HeartPulse,
  other: MoreHorizontal,
  freelance: TrendingUp,
  investment: Gift,
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  // Fallback to 'other' icon if category doesn't match
  const Icon = categoryIcons[transaction.category] || categoryIcons.other
  const isIncome = transaction.type === 'income'
  return (
    <div className="flex items-center justify-between py-4 px-1 group">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}
          `}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">
            {transaction.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{transaction.time}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <p
          className={`font-bold text-base ${isIncome ? 'text-emerald-500' : 'text-blue-500'}`}
        >
          {isIncome ? '+' : '-'} ฿{transaction.amount.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export function TransactionHistory({
  onHomeClick,
  onAddClick,
  onLogout,
}: TransactionHistoryProps) {
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroup[]>([])
  const [summary, setSummary] = useState<FinancialSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1 // 1-12
        const currentYear = currentDate.getFullYear()

        const [transactionsResponse, summaryResponse] = await Promise.all([
          transactionService.getTransactions({
            limit: 50,
            month: currentMonth,
            year: currentYear
          }),
          // Fetch summary for the current month
          summaryService.getFinancialSummary({
            month: currentMonth,
            year: currentYear
          })
        ])

        const groups = groupTransactionsByDate(transactionsResponse.data.transactions)
        setTransactionGroups(groups)
        setSummary(summaryResponse.data)
      } catch (err) {
        setError('Failed to load data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper to group transactions
  const groupTransactionsByDate = (transactions: ApiTransaction[]): TransactionGroup[] => {
    const groups: Record<string, Transaction[]> = {}

    transactions.forEach((t) => {
      // Parse date to get "Today", "Yesterday", or "DD MMM"
      const dateObj = new Date(t.date)
      const dateKey = getDateLabel(dateObj)

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].push({
        id: t.id,
        type: t.type,
        category: t.category as CategoryId, // Assumes API returns valid category strings
        title: t.title,
        amount: t.amount,
        time: t.time, // Using the pre-formatted time from API or formatting it here
      })
    })

    // Convert to array
    return Object.entries(groups).map(([date, transactions]) => ({
      date,
      transactions,
    }))
  }

  const getDateLabel = (date: Date): string => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (isSameDay(date, today)) return 'Today'
    if (isSameDay(date, yesterday)) return 'Yesterday'

    // Check for "This Week" logic if needed, or just return date string
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24 font-sans md:pb-0 md:ml-64 transition-all duration-300">
      <main className="max-w-md mx-auto md:max-w-7xl md:p-12 md:mx-0">
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-100 px-6 py-6 z-40 md:static md:bg-transparent md:border-none md:p-0 md:mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
                All Transactions
              </h1>
              <p className="text-xs text-gray-400 mt-1">Complete history</p>
            </div>
            <div className="md:hidden">
              <CoinMascot size={40} />
            </div>
          </div>
        </header>

        <div className="md:grid md:grid-cols-12 md:gap-10">
          {/* Transactions List */}
          <div className="md:col-span-8 px-6 py-6 space-y-8 md:p-0">
            {/* Mobile Summary Stats (hidden on desktop) */}
            <div className="md:hidden mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-6 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  This Month
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-emerald-600">+฿{summary?.totalIncome.toLocaleString() ?? '0'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Expense</p>
                    <p className="text-2xl font-bold text-blue-600">-฿{summary?.totalExpense.toLocaleString() ?? '0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-center py-4">{error}</div>}

            {transactionGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {group.date}
                  </h2>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Transactions */}
                <div className="bg-gray-50 rounded-3xl px-5 divide-y divide-gray-100 md:bg-white md:border md:border-gray-100 md:shadow-sm">
                  {group.transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </div>
              </div>
            ))}

            {transactionGroups.length === 0 && !error && (
              <div className="text-center py-12 text-gray-400">
                No transactions found.
              </div>
            )}
          </div>

          {/* Desktop Summary Sidebar */}
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-10">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Financial Summary</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs font-medium text-emerald-600 mb-1 uppercase tracking-wider">Total Income</p>
                    <p className="text-3xl font-bold text-emerald-700">+฿{summary?.totalIncome.toLocaleString() ?? '0'}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">Total Expense</p>
                    <p className="text-3xl font-bold text-blue-700">-฿{summary?.totalExpense.toLocaleString() ?? '0'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav
        activeTab="history"
        onHomeClick={onHomeClick}
        onAddClick={onAddClick}
        onLogout={onLogout}
      />
    </div>
  )
}
