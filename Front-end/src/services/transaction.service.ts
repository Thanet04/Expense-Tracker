import type { GetTransactionsParams, GetTransactionsResponse, CreateTransactionRequest, Transaction } from '../types/transaction.types'

// Mock API URL - replace with actual backend URL
const API_URL = 'http://localhost:3000/api'

export const transactionService = {
    async getTransactions(params?: GetTransactionsParams): Promise<GetTransactionsResponse> {
        const queryParams = new URLSearchParams()
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) queryParams.append(key, value.toString())
            })
        }

        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/transactions?${queryParams.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch transactions')
        }

        return response.json()
    },

    async createTransaction(data: CreateTransactionRequest): Promise<{ success: boolean; data: Transaction }> {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Failed to create transaction')
        }

        return response.json()
    }
}
