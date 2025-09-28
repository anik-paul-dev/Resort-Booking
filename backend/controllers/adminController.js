const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Feature = require('../models/Feature');
const Facility = require('../models/Facility');
const Carousel = require('../models/Carousel');
const Query = require('../models/Query');
const Review = require('../models/Review');
const Settings = require('../models/Settings');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    
    const totalRooms = await Room.countDocuments();
    const activeRooms = await Room.countDocuments({ isActive: true });
    
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    const totalFeatures = await Feature.countDocuments();
    const activeFeatures = await Feature.countDocuments({ isActive: true });
    
    const totalFacilities = await Facility.countDocuments();
    const activeFacilities = await Facility.countDocuments({ isActive: true });
    
    const totalQueries = await Query.countDocuments();
    const pendingQueries = await Query.countDocuments({ status: 'pending' });
    
    const totalReviews = await Review.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: 'pending' });
    
    const recentBookings = await Booking.find()
      .populate('user room')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentQueries = await Query.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentReviews = await Review.find()
      .populate('user room')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers,
      },
      rooms: {
        total: totalRooms,
        active: activeRooms,
      },
      bookings: {
        total: totalBookings,
        confirmed: confirmedBookings,
        pending: pendingBookings,
      },
      features: {
        total: totalFeatures,
        active: activeFeatures,
      },
      facilities: {
        total: totalFacilities,
        active: activeFacilities,
      },
      queries: {
        total: totalQueries,
        pending: pendingQueries,
      },
      reviews: {
        total: totalReviews,
        pending: pendingReviews,
      },
      recentBookings,
      recentQueries,
      recentReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive, isVerified, role } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }
    
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { isActive, isVerified, role } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (isActive !== undefined) {
      user.isActive = isActive;
    }
    
    if (isVerified !== undefined) {
      user.isVerified = isVerified;
    }
    
    if (role) {
      user.role = role;
    }
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'siteName', 'logo', 'favicon', 'contactEmail', 'contactPhone', 
      'contactAddress', 'socialMedia', 'isMaintenanceMode', 'maintenanceMessage',
      'isBookingPaused', 'bookingPauseMessage', 'currency', 'taxRate',
      'bookingPolicy', 'cancellationPolicy', 'paymentMethods'
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings();
    }
    
    updates.forEach(update => settings[update] = req.body[update]);
    await settings.save();
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getSettings,
  updateSettings,
};