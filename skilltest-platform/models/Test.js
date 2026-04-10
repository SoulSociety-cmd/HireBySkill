const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ['mcq', 'coding'], required: true },
  question: { type: String, required: true },
  options: [String], // for MCQ
  correctAnswer: String, // index for MCQ, solution for coding
  language: { type: String, default: 'javascript' }, // for coding
  timeLimit: { type: Number, default: 300 }, // seconds
  points: { type: Number, default: 10 },
  testCases: [{
    input: String,
    expectedOutput: String,
    timeout: { type: Number, default: 2000 }
  }] // for coding challenges
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [questionSchema],
  duration: { type: Number, default: 3600 }, // seconds
  isActive: { type: Boolean, default: true },
  maxAttempts: { type: Number, default: 1 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);

