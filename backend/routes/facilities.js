const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// @route   GET /api/facilities
// @desc    Get all facilities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true });
    res.json(facilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;