export interface Transaction {
    id: string
    type: 'income' | 'expense'
    category: string
    title: string
    amount: number
    date: string
    time: string
}

export interface CreateTransactionRequest {
    type: 'income' | 'expense'
    category: string
    title: string
    amount: number
    date: string
}

export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

export interface GetTransactionsResponse {
    success: boolean
    data: {
        transactions: Transaction[]
        pagination: Pagination
    }
}

export interface GetTransactionsParams {
    page?: number
    limit?: number
    type?: 'income' | 'expense'
    category?: string
    startDate?: string
    endDate?: string
    month?: number
    year?: number
}
