const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserBookings,
  getUserBookingById,
  cancelBooking,
  getUserReviews,
  submitReview,
} = require('../controllers/userController');

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put(
  '/profile',
  auth,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
  ],
  updateUserProfile
);

// Change password
router.put(
  '/change-password',
  auth,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  changePassword
);

// Get user bookings
router.get('/bookings', auth, getUserBookings);

// Get user booking by ID
router.get('/bookings/:id', auth, getUserBookingById);

// Cancel booking
router.put('/bookings/:id/cancel', auth, cancelBooking);

// Get user reviews
router.get('/reviews', auth, getUserReviews);

// Submit review
router.post(
  '/reviews',
  auth,
  [
    body('roomId').notEmpty().withMessage('Room ID is required'),
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
  ],
  submitReview
);

module.exports = router;