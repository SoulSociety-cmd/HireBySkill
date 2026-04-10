const express = require('express');
const User = require('../models/User');
const { auth, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', auth, authorizeRoles('company'), async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { role: 'company', _id: req.user._id } },
      {
        $lookup: {
          from: 'tests',
          localField: '_id',
          foreignField: 'company',
          as: 'tests'
        }
      },
      {
        $lookup: {
          from: 'submissions',
          localField: 'tests._id',
          foreignField: 'test',
          as: 'submissions'
        }
      },
      {
        $project: {
          totalTests: { $size: '$tests' },
          totalSubmissions: { $size: '$submissions' },
          avgScore: { 
            $avg: '$submissions.totalScore' 
          }
        }
      }
    ]);

    res.json(stats[0] || { totalTests: 0, totalSubmissions: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
