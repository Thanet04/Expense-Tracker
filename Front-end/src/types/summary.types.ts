export interface FinancialSummary {
    totalIncome: number
    totalExpense: number
    balance: number
}

export interface SummaryResponse {
    success: boolean
    data: FinancialSummary
}

export interface SummaryParams {
    type?: 'income' | 'expense'
    category?: string
    startDate?: string
    endDate?: string
    month?: number
    year?: number
}
