import type { SummaryResponse, SummaryParams } from '../types/summary.types'

const API_URL = 'http://localhost:3000/api'

export const summaryService = {
    async getFinancialSummary(params?: SummaryParams): Promise<SummaryResponse> {
        const queryParams = new URLSearchParams()
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) queryParams.append(key, value.toString())
            })
        }

        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/summary?${queryParams.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch financial summary')
        }

        return response.json()
    }
}
