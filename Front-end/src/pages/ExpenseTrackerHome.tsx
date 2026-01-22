import { useEffect, useState } from 'react'
import { CoinMascot } from '../components/Coin'
import { StatCard } from '../components/StatCard'
import { MonthlyChart } from '../components/MonthlyChart'
import { BottomNav } from '../components/BottomNav'
import { dashboardService } from '../services/dashboard.service'
import type { DashboardStats } from '../types/dashboard.types'
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

interface ExpenseTrackerHomeProps {
  onAddClick?: () => void
  onHistoryClick?: () => void
  onLogout?: () => void
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

export function ExpenseTrackerHome({
  onAddClick,
  onHistoryClick,
  onLogout,
}: ExpenseTrackerHomeProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Get user name from local storage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          // Handle both structure possibilities just in case
          setUserName(userData.user?.name || userData.name || 'User')
        }

        const response = await dashboardService.getDashboardStats()
        setStats(response.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 pb-24 md:pb-0 md:ml-64 transition-all duration-300 font-sans">
      <main className="max-w-md mx-auto px-6 py-8 md:max-w-7xl md:p-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <CoinMascot size={48} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Welcome back
              </p>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{userName}</h1>
            </div>
          </div>
        </header>

        <div className="md:grid md:grid-cols-12 md:gap-10">
          {/* Main Column */}
          <div className="md:col-span-8 space-y-10">
            {/* Total Balance */}
            <section className="text-center md:text-left bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-3xl text-white shadow-xl shadow-purple-200 md:shadow-none md:bg-none md:p-0 md:text-gray-900 md:rounded-none">
              <p className="text-sm font-medium text-white/80 md:text-gray-400 mb-2">
                Total Balance
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight">
                <span className="text-3xl text-white/80 md:text-gray-400 align-top mr-1">฿</span>
                {stats?.totalBalance.toLocaleString()}
              </h2>
            </section>

            {/* Chart Section */}
            <MonthlyChart data={stats?.monthlyStats} />
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-4 py-4 md:py-0 space-y-8">
            {/* Stat Cards */}
            <section className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <StatCard
                type="income"
                label="Income"
                amount={`฿${stats?.totalIncome.toLocaleString()}`}
              />
              <StatCard
                type="expense"
                label="Expense"
                amount={`฿${stats?.totalExpense.toLocaleString()}`}
              />
            </section>

            {/* Recent Transactions Preview */}
            <section className="bg-white md:p-6 md:rounded-3xl md:shadow-sm md:border md:border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                <button
                  onClick={onHistoryClick}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 bg-blue-50 px-3 py-1 rounded-full transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {stats?.recentTransactions.map((item, i) => {
                  const Icon = categoryIcons[item.category] || categoryIcons.other
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm overflow-hidden">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {item.time}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-sm ${item.type === 'income' ? 'text-emerald-500' : 'text-gray-800'}`}
                      >
                        {item.type === 'income' ? '+' : '-'}฿{item.amount.toLocaleString()}
                      </span>
                    </div>
                  )
                })}
                {stats?.recentTransactions.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">No recent transactions</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <BottomNav
        activeTab="home"
        onAddClick={onAddClick}
        onHistoryClick={onHistoryClick}
        onLogout={onLogout}
      />
    </div>
  )
}
