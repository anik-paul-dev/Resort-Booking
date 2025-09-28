const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'phone', 'address'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    req.user.password = newPassword;
    await req.user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }).populate('room');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking can be cancelled (e.g., at least 24 hours before check-in)
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const timeDiff = checkIn.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff < 24) {
      return res.status(400).json({ 
        message: 'Booking can only be cancelled at least 24 hours before check-in' 
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('room')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitReview = async (req, res) => {
  try {
    const { roomId, bookingId, rating, comment } = req.body;
    
    // Check if booking belongs to user and is completed
    const booking = await Booking.findOne({ 
      _id: bookingId, 
      user: req.user._id,
      room: roomId,
      status: 'confirmed'
    });
    
    if (!booking) {
      return res.status(400).json({ message: 'Invalid booking' });
    }
    
    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already submitted for this booking' });
    }
    
    const review = new Review({
      user: req.user._id,
      room: roomId,
      booking: bookingId,
      rating,
      comment,
    });
    
    await review.save();
    
    // Add review to room
    const room = await Room.findById(roomId);
    room.reviews.push(review._id);
    await room.save();
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserBookings,
  getUserBookingById,
  cancelBooking,
  getUserReviews,
  submitReview,
};