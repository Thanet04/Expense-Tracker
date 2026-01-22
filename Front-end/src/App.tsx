import { useState } from 'react'
import { ExpenseTrackerHome } from './pages/ExpenseTrackerHome'
import { AddTransaction } from './pages/AddTransaction'
import { TransactionHistory } from './pages/TransactionHistory'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'

type Screen = 'login' | 'signup' | 'home' | 'add' | 'history'

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    return token ? 'home' : 'login'
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentScreen('login')
  }

  return (
    <>
      {currentScreen === 'login' && (
        <Login
          onLogin={() => setCurrentScreen('home')}
          onSignUpClick={() => setCurrentScreen('signup')}
        />
      )}
      {currentScreen === 'signup' && (
        <SignUp
          onSignUp={() => setCurrentScreen('home')}
          onLoginClick={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'home' && (
        <ExpenseTrackerHome
          onAddClick={() => setCurrentScreen('add')}
          onHistoryClick={() => setCurrentScreen('history')}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'add' && (
        <AddTransaction onBack={() => setCurrentScreen('home')} />
      )}
      {currentScreen === 'history' && (
        <TransactionHistory
          onHomeClick={() => setCurrentScreen('home')}
          onAddClick={() => setCurrentScreen('add')}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}

export default App