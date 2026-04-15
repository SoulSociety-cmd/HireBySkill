import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateTest from './pages/CreateTest'
import TakeTest from './pages/TakeTest'
import TestResults from './pages/TestResults'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import CompanyDashboard from './pages/CompanyDashboard'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Companies from './pages/Companies'
import Students from './pages/Students'
import useAuthStore from './stores/authStore'
import { useTestStore } from './stores/testStore'
import { useThemeStore } from './stores/themeStore'

function App() {
  const { user, loading: authLoading, init } = useAuthStore()
  const { initTheme } = useThemeStore()
  const { fetchDashboardData } = useTestStore()

  useEffect(() => {
    init()
    initTheme()
  }, [init, initTheme])

  useEffect(() => {
    if (user) {
      fetchDashboardData(user.role)
    }
  }, [user, fetchDashboardData])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="glass-container pt-0">
          <Routes>
            {/* Public Landing Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/students" element={<Students />} />
            
            {/* Auth Pages */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            {user?.role === 'company' && (
              <>
                <Route path="/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/create-test" element={<CreateTest />} />
              </>
            )}
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
            <Route path="/test/:testId" element={user ? <TakeTest /> : <Navigate to="/" />} />
            <Route path="/results/:submissionId" element={user ? <TestResults /> : <Navigate to="/" />} />
            
            <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
