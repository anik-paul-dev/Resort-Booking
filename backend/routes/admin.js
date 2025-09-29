const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Facility = require('../models/Facility');
const Feature = require('../models/Feature');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Carousel = require('../models/Carousel');
const Query = require('../models/Query');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { uploadRoomImages, uploadFacilityImage, uploadCarouselImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const { body, validationResult } = require('express-validator');

// @route   GET /api/admin/stats
// @desc    Get admin stats
// @access  Private (Admin only)
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    // Get counts
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ available: true });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalReviews = await Review.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: 'pending' });
    const totalQueries = await Query.countDocuments();
    const pendingQueries = await Query.countDocuments({ status: 'pending' });
    
    // Get revenue
    const bookings = await Booking.find({ status: 'confirmed' });
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    
    // Get recent data
    const recentBookings = await Booking.find()
      .populate('user', 'name')
      .populate('room', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
      
    const recentReviews = await Review.find()
      .populate('user', 'name')
      .populate('room', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
      
    const recentQueries = await Query.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      counts: {
        totalRooms,
        availableRooms,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings,
        totalUsers,
        activeUsers,
        totalReviews,
        pendingReviews,
        totalQueries,
        pendingQueries
      },
      revenue: {
        totalRevenue
      },
      recent: {
        bookings: recentBookings,
        reviews: recentReviews,
        queries: recentQueries
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin only)
router.put('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.remove();
    
    res.json({ message: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/rooms
// @desc    Get all rooms
// @access  Private (Admin only)
router.get('/rooms', protect, authorize('admin'), async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/rooms
// @desc    Create a room
// @access  Private (Admin only)
router.post('/rooms', protect, authorize('admin'), uploadRoomImages, async (req, res) => {
  try {
    // Get image URLs from uploaded files
    const images = req.files.map(file => file.path);
    
    // Create room
    const room = new Room({
      ...req.body,
      images
    });
    
    await room.save();
    
    res.status(201).json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/rooms/:id
// @desc    Update a room
// @access  Private (Admin only)
router.put('/rooms/:id', protect, authorize('admin'), uploadRoomImages, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // If new images are uploaded, replace existing ones
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const imageUrl of room.images) {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`resort/rooms/${publicId}`);
      }
      
      // Set new images
      room.images = req.files.map(file => file.path);
    }
    
    // Update room
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: room.images },
      { new: true, runValidators: true }
    );
    
    res.json(updatedRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/rooms/:id
// @desc    Delete a room
// @access  Private (Admin only)
router.delete('/rooms/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Delete images from Cloudinary
    for (const imageUrl of room.images) {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`resort/rooms/${publicId}`);
    }
    
    await room.remove();
    
    res.json({ message: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/facilities
// @desc    Get all facilities
// @access  Private (Admin only)
router.get('/facilities', protect, authorize('admin'), async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    res.json(facilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/facilities
// @desc    Create a facility
// @access  Private (Admin only)
router.post('/facilities', protect, authorize('admin'), uploadFacilityImage, async (req, res) => {
  try {
    // Create facility
    const facility = new Facility({
      ...req.body,
      image: req.file.path
    });
    
    await facility.save();
    
    res.status(201).json(facility);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/facilities/:id
// @desc    Update a facility
// @access  Private (Admin only)
router.put('/facilities/:id', protect, authorize('admin'), uploadFacilityImage, async (req, res) => {
  try {
    let facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    // If new image is uploaded, replace existing one
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = facility.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`resort/facilities/${publicId}`);
      
      // Set new image
      facility.image = req.file.path;
    }
    
    // Update facility
    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: facility.image },
      { new: true, runValidators: true }
    );
    
    res.json(updatedFacility);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/facilities/:id
// @desc    Delete a facility
// @access  Private (Admin only)
router.delete('/facilities/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    // Delete image from Cloudinary
    const publicId = facility.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`resort/facilities/${publicId}`);
    
    await facility.remove();
    
    res.json({ message: 'Facility removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/features
// @desc    Get all features
// @access  Private (Admin only)
router.get('/features', protect, authorize('admin'), async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json(features);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/features
// @desc    Create a feature
// @access  Private (Admin only)
router.post('/features', protect, authorize('admin'), async (req, res) => {
  try {
    // Create feature
    const feature = new Feature(req.body);
    
    await feature.save();
    
    res.status(201).json(feature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/features/:id
// @desc    Update a feature
// @access  Private (Admin only)
router.put('/features/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    // Update feature
    const updatedFeature = await Feature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedFeature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/features/:id
// @desc    Delete a feature
// @access  Private (Admin only)
router.delete('/features/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    await feature.remove();
    
    res.json({ message: 'Feature removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/carousels
// @desc    Get all carousels
// @access  Private (Admin only)
router.get('/carousels', protect, authorize('admin'), async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({ order: 1 });
    res.json(carousels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/carousels
// @desc    Create a carousel
// @access  Private (Admin only)
router.post('/carousels', protect, authorize('admin'), uploadCarouselImage, async (req, res) => {
  try {
    // Create carousel
    const carousel = new Carousel({
      ...req.body,
      image: req.file.path
    });
    
    await carousel.save();
    
    res.status(201).json(carousel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/carousels/:id
// @desc    Update a carousel
// @access  Private (Admin only)
router.put('/carousels/:id', protect, authorize('admin'), uploadCarouselImage, async (req, res) => {
  try {
    let carousel = await Carousel.findById(req.params.id);
    
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    
    // If new image is uploaded, replace existing one
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = carousel.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`resort/carousel/${publicId}`);
      
      // Set new image
      carousel.image = req.file.path;
    }
    
    // Update carousel
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: carousel.image },
      { new: true, runValidators: true }
    );
    
    res.json(updatedCarousel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/carousels/:id
// @desc    Delete a carousel
// @access  Private (Admin only)
router.delete('/carousels/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    
    // Delete image from Cloudinary
    const publicId = carousel.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`resort/carousel/${publicId}`);
    
    await carousel.remove();
    
    res.json({ message: 'Carousel removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/reviews
// @desc    Get all reviews
// @access  Private (Admin only)
router.get('/reviews', protect, authorize('admin'), async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('room', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/reviews/:id
// @desc    Update a review
// @access  Private (Admin only)
router.put('/reviews/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Update review
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/reviews/:id
// @desc    Delete a review
// @access  Private (Admin only)
router.delete('/reviews/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    await review.remove();
    
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/queries
// @desc    Get all queries
// @access  Private (Admin only)
router.get('/queries', protect, authorize('admin'), async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/queries/:id
// @desc    Update a query
// @access  Private (Admin only)
router.put('/queries/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    
    // Update query
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedQuery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/queries/:id
// @desc    Delete a query
// @access  Private (Admin only)
router.delete('/queries/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    
    await query.remove();
    
    res.json({ message: 'Query removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/settings
// @desc    Update site settings
// @access  Private (Admin only)
router.put('/settings', protect, authorize('admin'), async (req, res) => {
  try {
    // In a real application, you would save settings to a database
    // For now, we'll just return success
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;