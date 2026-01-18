import { motion } from 'framer-motion'
interface SegmentedControlProps {
  value: 'income' | 'expense'
  onChange: (value: 'income' | 'expense') => void
}
export function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div className="bg-gray-100 p-1.5 rounded-full flex relative w-full max-w-xs mx-auto">
      {/* Sliding Background */}
      <motion.div
        className={`absolute top-1.5 bottom-1.5 rounded-full shadow-sm ${value === 'income' ? 'bg-emerald-400' : 'bg-blue-400'}`}
        initial={false}
        animate={{
          x: value === 'income' ? 0 : '100%',
          width: '50%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Income Button */}
      <button
        onClick={() => onChange('income')}
        className={`flex-1 relative z-10 py-3 text-sm font-bold rounded-full transition-colors duration-200 ${value === 'income' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Income
      </button>

      {/* Expense Button */}
      <button
        onClick={() => onChange('expense')}
        className={`flex-1 relative z-10 py-3 text-sm font-bold rounded-full transition-colors duration-200 ${value === 'expense' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Expense
      </button>
    </div>
  )
}
