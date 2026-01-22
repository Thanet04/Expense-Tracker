import { Home, Plus, History, LogOut } from 'lucide-react'
import { CoinMascot } from './Coin'

interface BottomNavProps {
  activeTab?: 'home' | 'history'
  onHomeClick?: () => void
  onAddClick?: () => void
  onHistoryClick?: () => void
  onLogout?: () => void
}

export function BottomNav({
  activeTab = 'home',
  onHomeClick,
  onAddClick,
  onHistoryClick,
  onLogout,
}: BottomNavProps) {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={onHomeClick}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Home"
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span
              className={`text-[10px] ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}
            >
              Home
            </span>
          </button>

          <button
            onClick={onAddClick}
            className="group relative -top-6 bg-emerald-400 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-200 transition-all active:scale-95 active:shadow-sm"
            aria-label="Add Transaction"
          >
            <Plus size={32} strokeWidth={3} />
          </button>

          <button
            onClick={onHistoryClick}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="History"
          >
            <History size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            <span
              className={`text-[10px] ${activeTab === 'history' ? 'font-bold' : 'font-medium'}`}
            >
              History
            </span>
          </button>

          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 transition-colors text-red-400 hover:text-red-500"
            aria-label="Logout"
          >
            <LogOut size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex-col z-50 shadow-sm">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <CoinMascot size={40} />
            <div>
              <h1 className="font-bold text-gray-900 text-lg">ExpenseTracker</h1>
              <p className="text-xs text-gray-400">Manage your money</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={onHomeClick}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'home'
              ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={onHistoryClick}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'history'
              ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <History size={22} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            <span className="text-sm">Transactions</span>
          </button>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Actions
            </p>
          </div>

          <button
            onClick={onAddClick}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-emerald-600 hover:bg-emerald-50 transition-all font-medium"
          >
            <Plus size={22} strokeWidth={2.5} />
            <span className="text-sm">Add New</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-50 transition-all font-medium"
          >
            <LogOut size={22} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
