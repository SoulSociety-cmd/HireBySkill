import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const Login = ({ setUser }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [role, setRole] = useState('student')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login'
      const res = await api.post(endpoint, { ...data, role })
      
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toast.success(`Welcome ${res.data.user.name}!`)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isRegister ? 'Create Account' : 'Sign in'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegister ? 'Join SkillTest Platform' : 'Welcome back'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="John Doe"
                {...register('name', { required: isRegister })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">Email is required</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                {...register('password', { required: true })}
              />
            </div>
            {isRegister && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Role
    </label>
    <select
      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      {...register('role')}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="student">Student</option>
      <option value="company">Company</option>
    </select>
  </div>
)}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-200"
            >
              {isRegister ? 'Create Account' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              {isRegister 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Create one"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
