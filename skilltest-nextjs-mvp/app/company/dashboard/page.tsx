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

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
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

      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200/50">
        <h2 className="text-3xl font-black mb-8 flex items-center justify-center space-x-3 text-emerald-900">
          🎯 Top 3 Smart Matches
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-emerald-200 hover:-translate-y-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
                  #{i}
                </div>
                <div>
                  <h4 className="font-bold text-lg">John Doe</h4>
                  <p className="text-emerald-600 font-semibold text-xl">92 SkillFit</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}} />
                  </div>
                  <span className="font-mono text-sm text-gray-600">React: 89</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span>2 tests • JS Expert • Remote OK</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 font-bold">
                Hire Now →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
