import { CoinMascot } from '../components/Coin'
import { StatCard } from '../components/StatCard'
import { MonthlyChart } from '../components/MonthlyChart'
import { BottomNav } from '../components/BottomNav'
interface ExpenseTrackerHomeProps {
  onAddClick?: () => void
  onHistoryClick?: () => void
  onLogout?: () => void
}

export function ExpenseTrackerHome({
  onAddClick,
  onHistoryClick,
  onLogout,
}: ExpenseTrackerHomeProps) {
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
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Alex Johnson</h1>
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
                15,000
              </h2>
            </section>

            {/* Chart Section */}
            <MonthlyChart />
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-4 space-y-8">
            {/* Stat Cards */}
            <section className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <StatCard type="income" label="Income" amount="฿25,000" />
              <StatCard type="expense" label="Expense" amount="฿10,000" />
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
                {[
                  {
                    title: 'Grocery Shopping',
                    date: 'Today, 10:30 AM',
                    amount: '-฿2,400',
                    icon: '🛒',
                  },
                  {
                    title: 'Freelance Payment',
                    date: 'Yesterday, 4:15 PM',
                    amount: '+฿8,500',
                    icon: '💰',
                  },
                  {
                    title: 'Netflix Subscription',
                    date: 'Aug 22, 9:00 AM',
                    amount: '-฿350',
                    icon: '🎬',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    <span
                      className={`font-bold text-sm ${item.amount.startsWith('+') ? 'text-emerald-500' : 'text-gray-800'}`}
                    >
                      {item.amount}
                    </span>
                  </div>
                ))}
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
