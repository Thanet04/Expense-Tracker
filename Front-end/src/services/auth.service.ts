import type { SignInRequest, SignUpRequest, AuthResponse, ApiError } from '../types/auth.types'

const API_BASE_URL = 'http://localhost:3000/api'

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type')
  
  if (!contentType?.includes('application/json')) {
    throw new Error('Server did not return JSON response')
  }

  const data = await response.json()

  if (!response.ok) {
    const error: ApiError = {
      success: false,
      message: data.message || 'An error occurred',
      error: data.error,
    }
    throw error
  }

  return data as T
}

export const authService = {
  /**
   * Sign in user
   * @param credentials - Email and password
   * @returns User data with token
   */
  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    return handleResponse<AuthResponse>(response)
  },

  /**
   * Sign up new user
   * @param userData - Name, email, and password
   * @returns User data with token
   */
  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    return handleResponse<AuthResponse>(response)
  },
}
