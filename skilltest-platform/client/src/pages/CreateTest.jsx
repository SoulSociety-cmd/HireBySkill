import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const CreateTest = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration: 60,
      difficulty: 'medium',
      questions: [{ 
        type: 'mcq', 
        question: '', 
        options: ['', '', '', ''], 
        correctAnswer: '0',
        points: 10 
      }]
    }
  })

  const [questionCount, setQuestionCount] = useState(1)
  const questions = watch('questions') || []

  const addQuestion = () => {
    const newQuestions = [...questions, { 
      type: 'mcq', 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: '0',
      points: 10 
    }]
    setQuestionCount(newQuestions.length)
  }

  const onSubmit = async (data) => {
    try {
      await api.post('/tests', data)
      toast.success('Test created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create test')
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="max-w-2xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-8 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50"
        >
          ← Back to Dashboard
        </button>
        
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Skill Test</h1>
          <p className="text-xl text-gray-600 mb-8">Build assessment with MCQ and coding questions</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Test Title *</label>
              <input
                {...register('title', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                placeholder="JavaScript Coding Challenge"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe what skills this test evaluates..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  {...register('duration', { min: 15, max: 240 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Difficulty</label>
                <select {...register('difficulty')} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Questions ({questionCount})</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Question</span>
                </button>
              </div>

              {questions.map((q, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Question {index + 1}</h3>
                    <select
                      {...register(`questions.${index}.type`)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="mcq">MCQ</option>
                      <option value="coding">Coding</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Question Text *</label>
                      <textarea
                        {...register(`questions.${index}.question`, { required: true })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="What is the output of console.log(typeof null)?"
                      />
                    </div>

                    {watch(`questions.${index}.type`) === 'mcq' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[0, 1, 2, 3].map((optIndex) => (
                            <div key={optIndex}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Option {String.fromCharCode(65 + optIndex)} *
                              </label>
                              <input
                                {...register(`questions.${index}.options.${optIndex}`, { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Correct Answer</label>
                          <select {...register(`questions.${index}.correctAnswer`)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                            <option value="0">A</option>
                            <option value="1">B</option>
                            <option value="2">C</option>
                            <option value="3">D</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Expected Solution</label>
                        <textarea
                          {...register(`questions.${index}.correctAnswer`, { required: true })}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                          placeholder="// Write expected code solution here&#10;function sumArray(arr) {&#10;  return arr.length;&#10;}"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                        <input
                          type="number"
                          {...register(`questions.${index}.points`, { min: 1, max: 100 })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                          defaultValue={10}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-8 rounded-2xl text-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>Create Test</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTest
