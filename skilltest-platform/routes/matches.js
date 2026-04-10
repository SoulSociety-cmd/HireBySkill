const express = require('express');
const Match = require('../models/Match');
const User = require('../models/User');
const Submission = require('../models/Submission');
const { auth, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/company-matches', auth, authorizeRoles('company'), async (req, res) => {
  try {
    const matches = await Match.find({ company: req.user._id })
      .populate('student', 'name email skills avatar')
      .populate('test', 'title difficulty')
      .sort({ updatedAt: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/invite', auth, authorizeRoles('company'), async (req, res) => {
  try {
    const { studentId, testId, score } = req.body;
    
    const submission = await Submission.findOne({ test: testId, student: studentId });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    const existingMatch = await Match.findOne({ company: req.user._id, student: studentId });
    if (existingMatch) {
      return res.status(400).json({ error: 'Match already exists' });
    }
    
    const match = new Match({
      company: req.user._id,
      student: studentId,
      test: testId,
      score
    });
    await match.save();
    
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

