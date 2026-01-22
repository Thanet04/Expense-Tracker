import type { Transaction } from './transaction.types'

export interface DashboardStats {
    totalBalance: number
    totalIncome: number
    totalExpense: number
    recentTransactions: Transaction[]
    monthlyStats: {
        name: string
        income: number
        expense: number
    }[]
}

export interface DashboardResponse {
    success: boolean
    data: DashboardStats
}
