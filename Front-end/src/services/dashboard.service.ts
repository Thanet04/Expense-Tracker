import type { DashboardResponse } from '../types/dashboard.types'

const API_URL = 'http://localhost:3000/api'

export const dashboardService = {
    async getDashboardStats(limit: number = 5): Promise<DashboardResponse> {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/dashboard?limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats')
        }

        return response.json()
    }
}
