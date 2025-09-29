const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .populate('user', 'name avatar')
      .populate('room', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post(
  '/',
  protect,
  [
    body('room', 'Room is required').not().isEmpty(),
    body('booking', 'Booking is required').not().isEmpty(),
    body('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
    body('comment', 'Comment is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { room, booking, rating, comment } = req.body;

    try {
      // Check if review already exists for this booking
      const existingReview = await Review.findOne({ booking });
      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this booking' });
      }

      // Create review
      const review = new Review({
        user: req.user.id,
        room,
        booking,
        rating,
        comment
      });

      await review.save();
      
      // Populate user and room data
      await review.populate('user', 'name avatar');
      await review.populate('room', 'name');

      res.status(201).json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;