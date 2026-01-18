import { useState } from 'react'
import { CoinMascot } from '../components/Coin'
import { Eye, EyeOff, Lock, User, Mail, ArrowLeft } from 'lucide-react'

interface SignUpProps {
    onSignUp: () => void
    onLoginClick: () => void
}

export function SignUp({ onSignUp, onLoginClick }: SignUpProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSignUp()
    }

    return (
        <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans md:flex md:items-center md:justify-center transition-colors">
            <main className="w-full max-w-md mx-auto px-6 py-12 flex flex-col justify-center min-h-screen md:min-h-0 md:h-auto md:bg-white md:rounded-[2.5rem] md:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] md:border md:border-gray-100 md:p-12">

                {/* Mobile only back button */}
                <div className="md:hidden absolute top-6 left-6">
                    <button onClick={onLoginClick} className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-gray-500 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <CoinMascot size={56} />
                    <h1 className="mt-4 text-2xl font-extrabold text-gray-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                        Join us to track your expenses smarter
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Full Name
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Create a password"
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <button
                            onClick={onLoginClick}
                            className="font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </main>
        </div>
    )
}
