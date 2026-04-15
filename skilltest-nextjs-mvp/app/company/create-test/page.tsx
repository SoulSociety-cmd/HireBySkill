'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // stub
import { DragDropSection } from '@/components/DragDropSection' // stub
import { Building2, Save, Play } from 'lucide-react'

export default function CreateTest() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])

  const addSection = (type) => {
    setSections([...sections, { id: Date.now(), type, content: '' }])
  }

  const handleSave = () => {
    console.log('Saving test:', { title, description, sections })
    alert('Test saved! (stub)')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
          Create New Test
        </h1>
        <p className="text-xl text-gray-600">
          Drag & drop builder for MCQ, Code, Project challenges
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border mb-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-16 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
              placeholder="JavaScript Senior Developer Test"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 resize-none"
              placeholder="Describe what this test measures..."
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center group hover:border-emerald-500 transition-all">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          <h3 className="text-2xl font-bold mb-2">Add Test Sections</h3>
          <p className="text-gray-600 mb-8">Drag and drop to build your test</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline" 
              className="group hover:bg-emerald-50 border-emerald-200 hover:border-emerald-400"
              onClick={() => addSection('mcq')}
            >
              MCQ Questions
            </Button>
            <Button 
              variant="outline" 
              className="group hover:bg-blue-50 border-blue-200 hover:border-blue-400"
              onClick={() => addSection('code')}
            >
              Coding Challenge
            </Button>
            <Button 
              variant="outline" 
              className="group hover:bg-purple-50 border-purple-200 hover:border-purple-400"
              onClick={() => addSection('project')}
            >
              Take Home Project
            </Button>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          {sections.map(section => (
            <div key={section.id} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold">Section {section.id}</h4>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <DragDropSection type={section.type} />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-12">
          <Button size="lg" className="px-12 text-xl font-bold shadow-xl hover:shadow-2xl bg-gradient-to-r from-emerald-500 to-emerald-600">
            <Save className="w-5 h-5 mr-2" />
            Save Test
          </Button>
        </div>
      </div>
    </div>
  )
}

