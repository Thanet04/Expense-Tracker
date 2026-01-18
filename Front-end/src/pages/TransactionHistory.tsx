import React from 'react'
import { CoinMascot } from '../components/Coin'
import { BottomNav } from '../components/BottomNav'
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
const categoryIcons: Record<CategoryId, React.ElementType> = {
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
// Mock data
const transactionGroups: TransactionGroup[] = [
  {
    date: 'Today',
    transactions: [
      {
        id: '1',
        type: 'expense',
        category: 'food',
        title: 'Coffee Shop',
        amount: 150,
        time: '2:30 PM',
      },
      {
        id: '2',
        type: 'expense',
        category: 'transport',
        title: 'Taxi Ride',
        amount: 250,
        time: '11:45 AM',
      },
      {
        id: '3',
        type: 'income',
        category: 'freelance',
        title: 'Client Payment',
        amount: 5000,
        time: '9:00 AM',
      },
    ],
  },
  {
    date: 'Yesterday',
    transactions: [
      {
        id: '4',
        type: 'expense',
        category: 'shopping',
        title: 'Grocery Store',
        amount: 2400,
        time: '6:15 PM',
      },
      {
        id: '5',
        type: 'expense',
        category: 'entertainment',
        title: 'Movie Tickets',
        amount: 600,
        time: '3:00 PM',
      },
      {
        id: '6',
        type: 'income',
        category: 'salary',
        title: 'Monthly Salary',
        amount: 25000,
        time: '10:00 AM',
      },
    ],
  },
  {
    date: 'This Week',
    transactions: [
      {
        id: '7',
        type: 'expense',
        category: 'bills',
        title: 'Electricity Bill',
        amount: 1200,
        time: 'Mon 4:30 PM',
      },
      {
        id: '8',
        type: 'expense',
        category: 'health',
        title: 'Pharmacy',
        amount: 450,
        time: 'Sun 11:20 AM',
      },
      {
        id: '9',
        type: 'income',
        category: 'investment',
        title: 'Dividend',
        amount: 3500,
        time: 'Sat 9:15 AM',
      },
    ],
  },
]
function TransactionItem({ transaction }: { transaction: Transaction }) {
  const Icon = categoryIcons[transaction.category]
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
                    <p className="text-2xl font-bold text-emerald-600">+฿33,500</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Expense</p>
                    <p className="text-2xl font-bold text-blue-600">-฿5,050</p>
                  </div>
                </div>
              </div>
            </div>

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
          </div>

          {/* Desktop Summary Sidebar */}
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-10">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Financial Summary</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs font-medium text-emerald-600 mb-1 uppercase tracking-wider">Total Income</p>
                    <p className="text-3xl font-bold text-emerald-700">+฿33,500</p>
                    <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                      <TrendingUp size={14} /> +12% from last month
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">Total Expense</p>
                    <p className="text-3xl font-bold text-blue-700">-฿5,050</p>
                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1">
                      <TrendingUp size={14} className="rotate-180" /> -5% from last month
                    </p>
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
