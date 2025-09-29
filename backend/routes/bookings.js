const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post(
  '/',
  protect,
  [
    body('room', 'Room is required').not().isEmpty(),
    body('checkIn', 'Check-in date is required').not().isEmpty(),
    body('checkOut', 'Check-out date is required').not().isEmpty(),
    body('adults', 'Number of adults is required').isInt({ min: 1 }),
    body('totalPrice', 'Total price is required').isFloat({ min: 0 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { room, checkIn, checkOut, adults, children, totalPrice, specialRequests } = req.body;

    try {
      // Check if room exists
      const roomData = await Room.findById(room);
      if (!roomData) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Check if room is available
      if (!roomData.available) {
        return res.status(400).json({ message: 'Room is not available' });
      }

      // Check for overlapping bookings
      const overlappingBookings = await Booking.find({
        room,
        $or: [
          {
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) }
          }
        ],
        status: { $in: ['pending', 'confirmed'] }
      });

      if (overlappingBookings.length > 0) {
        return res.status(400).json({ message: 'Room is not available for the selected dates' });
      }

      // Create booking
      const booking = new Booking({
        user: req.user.id,
        room,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        adults,
        children: children || 0,
        totalPrice,
        specialRequests: specialRequests || ''
      });

      await booking.save();
      
      // Populate user and room data
      await booking.populate('user', 'name email');
      await booking.populate('room', 'name pricePerNight');

      res.status(201).json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET /api/bookings
// @desc    Get all bookings (admin) or user bookings (user)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'admin') {
      bookings = await Booking.find()
        .populate('user', 'name email')
        .populate('room', 'name pricePerNight')
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ user: req.user.id })
        .populate('room', 'name pricePerNight images')
        .sort({ createdAt: -1 });
    }
    
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('room', 'name pricePerNight images features facilities');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to view this booking
    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }
    
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to cancel this booking
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    
    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;