'use client'

import { Badge } from '@/components/ui/badge' // stub
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Mail, Filter, Search } from 'lucide-react'

const [candidates, setCandidates] = useState([])
const [loading, setLoading] = useState(true)
const [jobId, setJobId] = useState('')
const [filters, setFilters] = useState({ minFit: 70, location: '', avail: '' })

useEffect(() => {
  fetchMatches()
}, [jobId, filters])

async function fetchMatches() {
  try {
    const params = new URLSearchParams({
      companyId: session?.user.id!,
      ...(jobId && { jobId }),
      minFit: filters.minFit.toString()
    })
    const res = await fetch(`/api/company/matches?${params}`)
    const data = await res.json()
    setCandidates(data)
  } catch (e) {
    console.error(e)
  } finally {
    setLoading(false)
  }
}

export default function Candidates() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Candidates
          </h1>
          <p className="text-xl text-gray-600 mt-2">45 total candidates tested</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white/70 backdrop-blur-xl rounded-2xl p-3 border shadow-lg">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Input placeholder="Search candidates..." className="border-none bg-transparent" />
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-6 text-left text-lg font-bold text-gray-900">Candidate</th>
                <th className="p-6 text-left text-lg font-bold text-gray-900">Primary Skill</th>
                <th className="p-6 text-left text-lg font-bold text-gray-900">Score</th>
                <th className="p-6 text-left text-lg font-bold text-gray-900">Status</th>
                <th className="p-6 text-right text-lg font-bold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-gray-900">{candidate.name}</td>
                  <td className="p-6">
                    <Badge className={`px-4 py-1 font-bold text-sm ${candidate.skill === 'React' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                      {candidate.skill}
                    </Badge>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className={`h-3 rounded-full ${candidate.score > 90 ? 'bg-emerald-500' : candidate.score > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${candidate.score}%`}} />
                      </div>
                      <span className="font-bold text-lg">{candidate.score}%</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <Badge className={`px-3 py-1 ${candidate.status === 'hired' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                      {candidate.status}
                    </Badge>
                  </td>
                  <td className="p-6 text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      <Mail className="w-4 h-4 mr-1" />
                      Invite
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-600">
                      Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skill Heatmap stub */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>Skill Heatmap</span>
          </h3>
          <div className="grid grid-cols-8 gap-1 text-xs font-bold text-center p-4 bg-gray-100 rounded-xl">
            {['React', 'Node', 'Python', 'AWS', 'Docker', 'SQL', 'Git', 'CI/CD'].map(skill => (
              <div key={skill} className="p-2 bg-white rounded border-2 border-emerald-300">
                {skill}
              </div>
            ))}
            <div className="col-span-8 h-px bg-gray-200 my-2" />
            {Array(8).fill(0).map((_, row) => (
              <div key={row} className="grid grid-cols-8 gap-1">
                {Array(8).fill(0).map((_, col) => (
                  <div 
                    key={col} 
                    className={`w-8 h-8 rounded border-2 border-gray-200 transition-all cursor-pointer hover:scale-110 ${
                      Math.random() > 0.7 ? 'bg-emerald-400 border-emerald-500 shadow-lg' :
                      Math.random() > 0.5 ? 'bg-yellow-400 border-yellow-500' :
                      'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
          <h3 className="text-2xl font-bold mb-6">Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-400 border-2 border-emerald-500 rounded shadow-lg" />
              <span>Expert (90%+)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-400 border-2 border-yellow-500 rounded" />
              <span>Strong (70-89%)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 border-2 border-gray-200 rounded" />
              <span>Beginner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

