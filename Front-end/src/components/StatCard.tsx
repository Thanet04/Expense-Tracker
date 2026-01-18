import { ArrowUp, ArrowDown } from 'lucide-react'
interface StatCardProps {
  type: 'income' | 'expense'
  amount: string
  label: string
}
export function StatCard({ type, amount, label }: StatCardProps) {
  const isIncome = type === 'income'
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-5 transition-transform active:scale-95
        ${isIncome ? 'bg-emerald-50 text-emerald-900' : 'bg-blue-50 text-blue-900'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`
            p-2 rounded-full 
            ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}
          `}
        >
          {isIncome ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </div>
      </div>

      <div className="space-y-1">
        <p
          className={`text-sm font-medium ${isIncome ? 'text-emerald-600' : 'text-blue-600'}`}
        >
          {label}
        </p>
        <p className="text-2xl font-bold tracking-tight">{amount}</p>
      </div>

      {/* Decorative background circle */}
      <div
        className={`
          absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 pointer-events-none
          ${isIncome ? 'bg-emerald-400' : 'bg-blue-400'}
        `}
      />
    </div>
  )
}
