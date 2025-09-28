const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  getBookingStats,
} = require('../controllers/bookingController');

// Create booking
router.post(
  '/',
  auth,
  [
    body('room').notEmpty().withMessage('Room ID is required'),
    body('checkIn').isISO8601().withMessage('Check-in date is required'),
    body('checkOut').isISO8601().withMessage('Check-out date is required'),
    body('adults').isInt({ min: 1 }).withMessage('Adults must be at least 1'),
    body('children').optional().isInt({ min: 0 }).withMessage('Children must be 0 or more'),
    body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer']).withMessage('Invalid payment method'),
  ],
  createBooking
);

// Get all bookings (admin)
router.get('/', admin, getBookings);

// Get booking by ID (admin)
router.get('/:id', admin, getBookingById);

// Update booking status (admin)
router.put(
  '/:id/status',
  admin,
  [body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Invalid status')],
  updateBookingStatus
);

// Get booking stats (admin)
router.get('/stats/:period', admin, getBookingStats);

module.exports = router;