const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');

// @route   GET /api/carousels
// @desc    Get all carousels
// @access  Public
router.get('/', async (req, res) => {
  try {
    const carousels = await Carousel.find({ isActive: true }).sort({ order: 1 });
    res.json(carousels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;