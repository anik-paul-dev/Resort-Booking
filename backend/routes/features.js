const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');

// @route   GET /api/features
// @desc    Get all features
// @access  Public
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find({ isActive: true });
    res.json(features);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;