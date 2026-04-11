import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Editor } from '@monaco-editor/react'
import { io } from 'socket.io-client'
import { api } from '../utils/api'
import toast from 'react-hot-toast'
import { 
  PlayIcon, 
  ClockIcon,
  CheckCircleIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'

let socket = null

const TakeTest = ({ user }) => {
  const { testId } = useParams()
  const navigate = useNavigate()
  const [test, setTest] = useState(null)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [codeResults, setCodeResults] = useState(null)
  const [submissionId, setSubmissionId] = useState(null)

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000')
    
    socket.on('grade:started', (data) => {
      toast('🧪 Code grading started...', { duration: 2000 })
    })

    socket.on('grade:progress', (data) => {
      console.log('Grading progress:', data)
    })

    socket.on('sandbox:complete', (results) => {
      toast.success(`Tests: ${results.testsPassed}/${results.totalTests}`)
    })

    socket.on('grade:complete', (data) => {
      toast.success(`Final Score: ${Math.round(data.score)}%`)
      setCodeResults(data)
    })

    socket.on('grade:error', (error) => {
      toast.error(`Grading error: ${error}`)
    })

    return () => socket?.disconnect()
  }, [])

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.get(`/tests/${testId}`)
        setTest(res.data)
        setTimeLeft(res.data.duration)
      } catch (error) {
        toast.error('Test not found')
        navigate('/dashboard')
      }
    }
    fetchTest()
  }, [testId, navigate])

  
  useEffect(() => {
    if (!test || isSubmitted) return
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, test, isSubmitted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCodeSubmit = async () => {
    const question = test.questions[currentQuestion]
    const code = answers[currentQuestion]
    
    if (!code?.trim()) {
      toast.error('Please write some code first!')
      return
    }

    try {
      const startTime = Date.now()
      const res = await api.post('/submissions/code', {
        testId,
        questionId: question._id || question.questionId || currentQuestion.toString(),
        code
      }, {
        headers: { 'x-start-time': startTime }
      })

      setSubmissionId(res.data.submissionId)
      socket.emit('join-grading', res.data.submissionId)
      toast.success('Code submitted! Grading in progress...', { duration: 3000 })
      
      // Poll results or use socket
      const interval = setInterval(async () => {
        try {
          const result = await api.get(`/submissions/${res.data.submissionId}`)
          if (result.data.status === 'graded') {
            setCodeResults(result.data)
            clearInterval(interval)
          }
        } catch {}
      }, 2000)
    } catch (error) {
      toast.error(`Submission failed: ${error.response?.data?.error || error.message}`)
    }
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }))
    setCodeResults(null) // Reset results
  }

  const handleSubmit = async () => {
    try {
      const res = await api.post('/submissions', {
        test: testId,
        answers: Object.entries(answers).map(([qIndex, answer]) => ({
          questionId: test.questions[qIndex]._id || qIndex,
          answer,
          timeTaken: 0
        }))
      })
      toast.success('Test submitted successfully!')
      navigate(`/results/${res.data._id}`)
    } catch (error) {
      toast.error('Submission failed')
    }
  }

  if (!test) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  const question = test.questions[currentQuestion]
  const isCoding = question?.type === 'coding'
  const questionAnswered = answers[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-mono bg-primary-100 px-3 py-1 rounded-xl text-primary-800 font-bold">
                    Q {currentQuestion + 1} / {test.questions.length}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ClockIcon className="w-5 h-5" />
                    <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {questionAnswered && <CheckCircleIcon className="w-7 h-7 text-emerald-500" />}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
              
              {/* Question */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <span>{currentQuestion + 1}.</span>
                  <CodeBracketIcon className="w-8 h-8 text-primary-600" />
                  <span>{question?.question}</span>
                </h2>

                {isCoding ? (
                  <>
                    {/* Monaco Editor */}
                    <div className="space-y-4 mb-8">
                      <label className="block text-lg font-semibold text-gray-900">Write your solution</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-1 hover:border-primary-400 transition-colors bg-gradient-to-b from-gray-50">
                        <Editor
                          height="500px"
                          language={question.language || 'javascript'}
                          theme="vs-dark"
                          value={answers[currentQuestion] || '// Write your code here\nfunction solution(input) {\n  // TODO\n  return input.length;\n}'}
                          onChange={value => handleAnswerChange(currentQuestion, value)}
                          options={{
                            minimap: { enabled: true },
                            fontSize: 15,
                            wordWrap: 'on',
                            automaticLayout: true
                          }}
                        />
                      </div>
                      
                      {/* Test Cases */}
                      {question.testCases?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {question.testCases.map((tc, i) => (
                            <div key={i} className="p-4 bg-blue-50 border rounded-xl">
                              <div className="font-mono text-sm mb-1">Test {i+1}</div>
                              <div className="text-xs text-gray-600 mb-2">Input: <code>{tc.input}</code></div>
                              <div className="font-semibold text-green-700">Expected: <code>{tc.expectedOutput}</code></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <button
                        onClick={handleCodeSubmit}
                        disabled={!questionAnswered}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex-1 sm:flex-none flex items-center justify-center space-x-2"
                      >
                        <PlayIcon className="w-5 h-5" />
                        <span>🚀 Run Tests & Grade</span>
                      </button>
                    </div>

                    {/* Results */}
                    {codeResults && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-200 rounded-2xl">
                        <h3 className="text-xl font-bold text-emerald-900 mb-4">✅ Grading Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          <div>
                            <div className="font-semibold text-gray-800 mb-2">Score Breakdown</div>
                            <div>Functionality: {Math.round(codeResults.detailed?.functionality || 0)}%</div>
                            <div>Code Quality: {Math.round(codeResults.detailed?.codeQuality || 0)}%</div>
                            <div>Efficiency: {Math.round(codeResults.detailed?.efficiency || 0)}%</div>
                            <div>Best Practices: {Math.round(codeResults.detailed?.bestPractices || 0)}%</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 mb-2">AI Feedback</div>
                            <p className="text-gray-700 italic">{codeResults.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  
                  <div className="space-y-4 max-w-2xl">
                    {/* ... MCQ options ... */}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Points: <span className="font-bold text-2xl text-primary-600">{question.points}</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    {currentQuestion > 0 && (
                      <button
                        onClick={() => setCurrentQuestion(prev => prev - 1)}
                        className="px-6 py-3 border border-gray-300 font-semibold rounded-xl hover:bg-gray-50"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg"
                    >
                      Complete Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Results loading...</div>
      )}
    </div>
  )
}

export default TakeTest

