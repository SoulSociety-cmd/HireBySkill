import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { 
  ChartBarIcon, 
  DocumentPlusIcon, 
  AcademicCapIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({})
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'company') {
          const [testsRes] = await Promise.all([
            api.get('/tests?company=true&limit=5')
          ])
          setTests(testsRes.data)
          setStats({ totalTests: testsRes.data.length })
        } else {
          const [testsRes] = await Promise.all([
            api.get('/tests?limit=5')
          ])
          setTests(testsRes.data)
          setStats({ availableTests: testsRes.data.length })
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user.role])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-xl text-gray-600">
          {user.role === 'company' ? 'Manage your skill tests' : 'Find and take skill tests'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-xl">
              <DocumentPlusIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTests || stats.availableTests || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {user.role === 'company' ? (
          <Link
            to="/create-test"
            className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
          >
            <DocumentPlusIcon className="mx-auto h-16 w-16 mb-6 opacity-90 group-hover:opacity-100" />
            <h3 className="text-2xl font-bold mb-4">Create New Test</h3>
            <p className="text-primary-100 mb-8">Build custom coding & MCQ assessments for your hiring needs</p>
            <span className="text-primary-200 font-semibold">Create Test →</span>
          </Link>
        ) : (
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
            <AcademicCapIcon className="mx-auto h-16 w-16 mb-6 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Find Your Next Opportunity</h3>
            <p className="mb-8">Take real-world skill tests from top companies</p>
            <p className="text-3xl font-bold text-emerald-100">Ready to showcase your skills?</p>
          </div>
        )}
      </div>

      {/* Recent Tests */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Recent Tests</h2>
          <p className="text-gray-600 mt-1">
            {user.role === 'company' ? 'Your published tests' : 'Available tests'}
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {tests.map((test) => (
            <Link
              key={test._id}
              to={`/test/${test._id}`}
              className="p-8 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{test.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>⏱️ {Math.floor(test.duration / 60)} min</span>
                    <span>•</span>
                    <span>⭐ {test.difficulty?.toUpperCase()}</span>
                  </div>
                </div>
                <div className="ml-6">
                  <span className="px-4 py-2 bg-primary-100 text-primary-800 text-sm font-semibold rounded-xl group-hover:bg-primary-200 transition-colors">
                    {user.role === 'company' ? 'View' : 'Take Test'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {tests.length === 0 && (
            <div className="p-16 text-center text-gray-500">
              {user.role === 'company' 
                ? 'No tests created yet. Create your first test!'
                : 'No tests available. Check back soon!'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
