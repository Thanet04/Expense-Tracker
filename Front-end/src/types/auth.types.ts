// Request types
export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  password: string
}

// Response types
export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      name: string
      email: string
    }
    token: string
  }
}

export interface ApiError {
  success: false
  message: string
  error?: string
}

// User data type
export interface User {
  id: string
  name: string
  email: string
  token?: string
}
