import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateTest from './pages/CreateTest'
import TakeTest from './pages/TakeTest'
import TestResults from './pages/TestResults'
import Navbar from './components/Navbar'
import { api } from './utils/api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/users/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token')
          navigate('/login')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
{user && <Navbar user={user} onLogout={logout} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
{user?.role === 'company' && (
  <>
    <Route path="/create-test" element={<CreateTest />} />
  </>
)}
        <Route path="/test/:testId" element={user ? <TakeTest user={user} /> : <Navigate to="/login" />} />
        <Route path="/results/:submissionId" element={user ? <TestResults /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </div>
  )
}

export default App
