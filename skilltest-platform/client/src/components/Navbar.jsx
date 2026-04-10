import { Link, useLocation } from 'react-router-dom'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const Navbar = ({ user, onLogout }) => {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <div className="flex items-center h-10 w-10 bg-primary-600 rounded-xl">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">SkillTest</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
              <span className="font-medium text-gray-900 hidden md:block">{user.name}</span>
              <span className="px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">
                {user.role === 'company' ? 'COMPANY' : 'STUDENT'}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
