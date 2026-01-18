import {
  Utensils,
  Bus,
  ShoppingBag,
  Briefcase,
  Film,
  Receipt,
  HeartPulse,
  MoreHorizontal,
} from 'lucide-react'
export type CategoryId =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'salary'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'other'
interface CategorySelectorProps {
  selected: CategoryId
  onSelect: (id: CategoryId) => void
  type: 'income' | 'expense'
}
const categories = [
  {
    id: 'food',
    label: 'Food',
    icon: Utensils,
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: Bus,
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: ShoppingBag,
  },
  {
    id: 'salary',
    label: 'Salary',
    icon: Briefcase,
  },
  {
    id: 'entertainment',
    label: 'Fun',
    icon: Film,
  },
  {
    id: 'bills',
    label: 'Bills',
    icon: Receipt,
  },
  {
    id: 'health',
    label: 'Health',
    icon: HeartPulse,
  },
  {
    id: 'other',
    label: 'Other',
    icon: MoreHorizontal,
  },
] as const
export function CategorySelector({
  selected,
  onSelect,
  type,
}: CategorySelectorProps) {
  const activeColor =
    type === 'income'
      ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
      : 'bg-blue-100 text-blue-600 border-blue-200'
  const activeRing = type === 'income' ? 'ring-emerald-400' : 'ring-blue-400'
  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((cat) => {
        const isSelected = selected === cat.id
        const Icon = cat.icon
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`
                w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200
                ${isSelected ? `${activeColor} ring-2 ${activeRing} ring-offset-2 border-transparent` : 'bg-gray-50 border-gray-100 text-gray-400 group-hover:border-gray-200 group-hover:bg-gray-100'}
              `}
            >
              <Icon size={24} strokeWidth={2} />
            </div>
            <span
              className={`text-xs font-medium transition-colors ${isSelected ? 'text-gray-800' : 'text-gray-400'}`}
            >
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
