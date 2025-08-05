const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');

// POST /interviews - Add new interview
router.post('/', async (req, res) => {
  try {
    const { company, title, role, date, status, notes } = req.body;

    if (!company || !title) {
      return res.status(400).json({ message: 'Company and title are required.' });
    }

    const newInterview = new Interview({ company, title, role, date, status, notes });
    const saved = await newInterview.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving interview:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /interviews - List all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update interview status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Interview.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Interview not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
