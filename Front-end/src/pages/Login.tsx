import { useState } from 'react'
import { CoinMascot } from '../components/Coin'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

interface LoginProps {
    onLogin: () => void
    onSignUpClick: () => void
}

export function Login({ onLogin, onSignUpClick }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        onLogin()
    }

    return (
        <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans md:flex md:items-center md:justify-center transition-colors">
            <main className="w-full max-w-md mx-auto px-6 py-12 flex flex-col justify-center min-h-screen md:min-h-0 md:h-auto md:bg-white md:rounded-[2.5rem] md:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] md:border md:border-gray-100 md:p-12">
                <div className="flex flex-col items-center mb-10">
                    <CoinMascot size={64} />
                    <h1 className="mt-6 text-2xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Sign in to manage your expenses
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {/* <div className="flex justify-end">
                            <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">
                                Forgot Password?
                            </button>
                        </div> */}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 mt-4"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button
                            onClick={onSignUpClick}
                            className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </main>
        </div>
    )
}
