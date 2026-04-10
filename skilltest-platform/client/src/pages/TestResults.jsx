import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../utils/api'

const TestResults = () => {
  const { submissionId } = useParams()
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await api.get(`/submissions/${submissionId}`)
        setSubmission(res.data)
      } catch (error) {
        console.error('Error fetching results:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubmission()
  }, [submissionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!submission) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Results not found</div>
  }

  const scorePercent = ((submission.totalScore / 100) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-12 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white mb-8 shadow-2xl">
            <svg className="w-12 h-12 mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">{scorePercent}%</h1>
              <p className="text-lg opacity-90">{submission.totalScore}/100</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{submission.test.title}</h2>
            <p className="text-gray-600 mb-4">Completed on {new Date(submission.completedAt).toLocaleDateString()}</p>
            <div className="inline-flex items-center space-x-4 text-sm text-gray-600 bg-gray-100 px-6 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Time: {Math.floor(submission.timeTaken / 60)}m {submission.timeTaken % 60}s</span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Breakdown */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Question Breakdown</span>
            </h3>

            <div className="space-y-4">
              {submission.answers.map((answer, index) => (
                <div key={answer.questionId} className={`p-6 rounded-2xl border-l-8 ${
                  answer.isCorrect 
                    ? 'bg-emerald-50 border-emerald-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-900">Q{index + 1}</h4>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        answer.isCorrect 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {answer.points} / {answer.maxPoints}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm space-y-2">
                    <p className="font-medium text-gray-900 mb-2">Your Answer:</p>
                    {answer.type === 'coding' ? (
                      <pre className="bg-gray-100 p-4 rounded-xl font-mono text-xs overflow-auto max-h-32">
                        {answer.userAnswer || '// No answer submitted'}
                      </pre>
                    ) : (
                      <div className="flex space-x-2">
                        {answer.options.map((opt, optIndex) => (
                          <span key={optIndex} className={`px-3 py-1 rounded-full text-xs font-mono ${
                            answer.userAnswer === optIndex.toString() 
                              ? 'bg-primary-200 text-primary-800 font-semibold' 
                              : 'bg-gray-100'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                        ))}
                      </div>
                    )}
                    {!answer.isCorrect && answer.feedback && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="font-medium text-yellow-900 mb-2">💡 Feedback:</p>
                        <p className="text-sm text-yellow-800">{answer.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Feedback & Summary */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>AI Analysis</span>
            </h3>

            {submission.aiFeedback ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                  <p className="text-lg leading-relaxed text-gray-800">{submission.aiFeedback}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-center p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-3xl font-bold text-emerald-600">{scorePercent}%</p>
                    <p className="text-sm text-gray-600 mt-1">Overall Score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary-600">85%</p>
                    <p className="text-sm text-gray-600 mt-1">Coding Accuracy</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <svg className="w-24 h-24 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 className="text-xl font-semibold mb-2">AI Grading in Progress</h4>
                <p>Your detailed feedback will be available shortly</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-16 justify-center">
          <button className="px-12 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-xl transition-all">
            Download Results PDF
          </button>
          <button className="px-12 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 shadow-lg transition-all">
            Share Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestResults
