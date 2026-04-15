'use client'

import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

export default function Analytics() {
  const funnelData = {
    labels: ['Test Views', 'Started', 'Completed', 'Hired'],
    datasets: [
      {
        label: 'Candidates',
        data: [120, 85, 45, 12],
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.4,
      },
    ],
  }

  const conversionRates = [
    { stage: 'Started / Views', rate: '71%' },
    { stage: 'Completed / Started', rate: '53%' },
    { stage: 'Hired / Completed', rate: '27%' },
  ]

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
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conversion funnel and hiring metrics
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6" />
            <span>Conversion Funnel</span>
          </h3>
          <Line data={funnelData} options={options} />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border space-y-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <span>Conversion Rates</span>
          </h3>
          {conversionRates.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border-l-4 border-emerald-400">
              <span className="font-medium text-gray-900">{item.stage}</span>
              <span className="text-2xl font-black text-emerald-600">{item.rate}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-500 rounded-2xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tested</p>
              <p className="text-3xl font-black text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Completion Time</p>
              <p className="text-3xl font-black text-gray-900">14m 32s</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-2xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-3xl font-black text-gray-900">82%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

