const express = require('express');
const { body } = require('express-validator'); // Add this import
const router = express.Router();
const admin = require('../middleware/admin');
const {
  getReviews,
  getReviewById,
  updateReviewStatus,
  deleteReview,
  getReviewStats,
} = require('../controllers/reviewController');

// Get all reviews (admin)
router.get('/', admin, getReviews);

// Get review by ID (admin)
router.get('/:id', admin, getReviewById);

// Update review status (admin)
router.put(
  '/:id/status',
  admin,
  [
    body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
  ],
  updateReviewStatus
);

// Delete review (admin)
router.delete('/:id', admin, deleteReview);

// Get review stats (admin)
router.get('/stats/:period', admin, getReviewStats);

module.exports = router;