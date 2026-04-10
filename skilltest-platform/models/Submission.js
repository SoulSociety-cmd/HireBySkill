const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed, 
    timeTaken: Number,
    executionLogs: String, // sandbox output/errors
    sandboxResults: {
      testsPassed: Number,
      totalTests: Number,
      eslintScore: Number,
      runtimeMs: Number
    }
  }],
  totalScore: { type: Number, default: 0 },
  detailedScores: {
    functionality: { type: Number, default: 0 }, // 50%
    codeQuality: { type: Number, default: 0 },    // 20% ESLint
    efficiency: { type: Number, default: 0 },     // 20% Big-O
    bestPractices: { type: Number, default: 0 }   // 10%
  },
  status: { type: String, enum: ['pending', 'running', 'graded', 'failed'], default: 'pending' },
  aiFeedback: String,
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

