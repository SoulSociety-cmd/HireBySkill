const express = require('express');
const Test = require('../models/Test');
const { auth, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { limit = 10, company, difficulty } = req.query;
    const filters = { isActive: true };
    if (company === 'true') {
      filters.company = req.user._id;
    }
    const tests = await Test.find(filters)
      .populate('company', 'name')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, authorizeRoles('company'), async (req, res) => {
  try {
    const test = new Test({ ...req.body, company: req.user._id });
    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('company', 'name');
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
