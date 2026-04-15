'use client'

import { useEffect, useState } from 'react'
import { User, Target } from 'lucide-react'

interface HeatmapProps {
  matches: Array<{
    studentId: string
    skillFit: number
    tests: Array<{name: string, score: number}>
  }>
  skills: string[]
}

export default function MatchesHeatmap({ matches, skills }: HeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<number[][]>([])

  useEffect(() => {
    const data = skills.map(() => Array(matches.length).fill(0))
    matches.forEach((match, col) => {
      match.tests.forEach(test => {
        const row = skills.indexOf(test.name.split('-')[0])
        if (row >= 0) data[row][col] = test.score / 100
      })
    })
    setHeatmapData(data)
  }, [matches, skills])

  const legendColors = [
    { color: '#ef4444', label: 'Low' },
    { color: '#f59e0b', label: 'Medium' },
    { color: '#10b981', label: 'High' },
    { color: '#084f6a', label: 'Expert' }
  ]

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-emerald-500" />
        <h3 className="text-2xl font-bold">Skills Heatmap</h3>
      </div>
      
      <div className="grid gap-2 mb-6">
        {skills.map((skill, row) => (
          <div key={skill} className="flex items-center space-x-2 text-sm font-bold text-gray-800">
            <div className="w-20">{skill.toUpperCase()}</div>
            <div className="flex gap-1 flex-1">
              {matches.map((_, col) => {
                const intensity = heatmapData[row]?.[col] || 0
                const color = intensity > 0.9 ? '#059669' : intensity > 0.7 ? '#10b981' : intensity > 0.5 ? '#f59e0b' : '#fee2e2'
                return (
                  <div 
                    key={col}
                    className="w-6 h-6 rounded border transition-all hover:scale-125 cursor-pointer"
                    style={{ backgroundColor: color, opacity: intensity }}
                    title={`${(intensity*100).toFixed(0)}%`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2">
          {legendColors.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <User className="w-4 h-4" />
          <span>{matches.length} candidates</span>
        </div>
      </div>
    </div>
  )
}
