const express = require('express');
const Submission = require('../models/Submission');
const Test = require('../models/Test');
const AIGrader = require('../utils/aiGrader');
const SandboxRunner = require('../utils/sandboxRunner');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { test: testId, answers } = req.body;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ error: 'Test not found' });

    const submission = new Submission({
      test: testId,
      student: req.user._id,
      answers,
      status: 'graded', 
      startedAt: new Date(),
      completedAt: new Date()
    });

    const mcqGrade = AIGrader.gradeMCQ(answers, test.questions);
    submission.totalScore = mcqGrade.score;
    submission.aiFeedback = mcqGrade.feedback;

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/code', auth, async (req, res) => {
  try {
    const { testId, questionId, code } = req.body;
    
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ error: 'Test not found' });

    const question = test.questions.find(q => q._id?.toString() === questionId || q.questionId === questionId);
    if (!question || question.type !== 'coding') {
      return res.status(400).json({ error: 'Coding question not found' });
    }

    const submission = new Submission({
      test: testId,
      student: req.user._id,
      answers: [{
        questionId,
        answer: code,
        timeTaken: Date.now() - new Date(req.headers['x-start-time'] || Date.now()).getTime()
      }],
      status: 'running',
      startedAt: new Date()
    });

    await submission.save();

    
    const room = `grading-${submission._id}`;
    req.io.to(room).emit('grade:started', { submissionId: submission._id });

    (async () => {
      try {
        const gradeResult = await AIGrader.gradeCoding(submission, question, req.io, room);
        
        submission.status = 'graded';
        submission.completedAt = new Date();
        submission.totalScore = gradeResult.total;
        submission.detailedScores = {
          functionality: gradeResult.functionality,
          codeQuality: gradeResult.codeQuality,
          efficiency: gradeResult.efficiency,
          bestPractices: gradeResult.bestPractices
        };
        submission.aiFeedback = gradeResult.aiFeedback;
        submission.answers[0].sandboxResults = gradeResult.sandboxResults;
        submission.answers[0].executionLogs = JSON.stringify(gradeResult.sandboxResults, null, 2);

        await submission.save();
        
        req.io.to(room).emit('grade:complete', {
          score: gradeResult.total,
          detailed: submission.detailedScores,
          feedback: gradeResult.aiFeedback
        });
      } catch (error) {
        submission.status = 'failed';
        submission.aiFeedback = `Grading failed: ${error.message}`;
        await submission.save();
        req.io.to(room).emit('grade:error', error.message);
      }
    })();

    res.json({ 
      message: 'Code submitted and grading started', 
      submissionId: submission._id,
      watch: `/api/submissions/${submission._id}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('test')
      .populate('student', 'name');
    
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    
    if (submission.status === 'pending') {
      submission.status = 'failed';
      submission.aiFeedback = 'Legacy grading deprecated. Use /code endpoint.';
      await submission.save();
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-submissions', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate('test', 'title difficulty company')
      .populate('test.company', 'name')
      .sort({ completedAt: -1 })
      .limit(20);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

