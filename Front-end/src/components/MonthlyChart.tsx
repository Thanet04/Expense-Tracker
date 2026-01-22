import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
interface MonthlyChartProps {
  data?: {
    name: string
    income: number
    expense: number
  }[]
}

export function MonthlyChart({ data = [] }: MonthlyChartProps) {
  return (
    <div className="w-full h-64 md:h-96 bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Monthly Flow</h3>
        <div className="flex gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-gray-500">In</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-gray-500">Out</span>
          </div>
        </div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9CA3AF',
                fontSize: 12,
              }}
              dy={10}
            />
            <Tooltip
              cursor={{
                fill: '#F3F4F6',
                radius: 8,
              }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number | undefined) => [value ? `฿${value.toLocaleString()}` : '฿0']}
            />
            <Bar
              dataKey="income"
              fill="#6EE7B7"
              radius={[4, 4, 4, 4]}
              barSize={8}
            />
            <Bar
              dataKey="expense"
              fill="#60A5FA"
              radius={[4, 4, 4, 4]}
              barSize={8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
