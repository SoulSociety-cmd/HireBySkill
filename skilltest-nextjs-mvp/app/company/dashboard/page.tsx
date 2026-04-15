'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // stub if not exist
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Users, DollarSign, FileText, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function CompanyDashboard() {
  const { data: session } = useSession()

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(34,197,94,0.6)',
      },
    ],
  }

  const scoreChartData = {
    labels: ['<50%', '50-70%', '70-90%', '>90%'],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: [
          '#ef4444',
          '#eab308',
          '#10b981',
          '#3b82f6',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Company Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your test performance, revenue, and top candidates.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border hover:shadow-3xl transition-all group">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-500 rounded-2xl group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tests Created</p>
              <p className="text-3xl font-black text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border hover:shadow-3xl transition-all group">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-500 rounded-2xl group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900">$240</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border hover:shadow-3xl transition-all group">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Candidates Tested</p>
              <p className="text-3xl font-black text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border hover:shadow-3xl transition-all group">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 rounded-2xl group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hired</p>
              <p className="text-3xl font-black text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6" />
            <span>Revenue Trend</span>
          </h3>
          <Bar data={revenueChartData} options={options} />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <h3 className="text-2xl font-bold mb-6">Score Distribution</h3>
          <Doughnut data={scoreChartData} options={options} />
        </div>
      </div>
    </div>
  )
}
