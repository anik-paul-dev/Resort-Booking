const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { sendBookingConfirmationEmail, sendBookingCancellationEmail } = require('../services/email');

const createBooking = async (req, res) => {
  try {
    const { room, checkIn, checkOut, adults, children, paymentMethod, specialRequests } = req.body;
    const userId = req.user._id;

    // Check if room is available for the dates
    const existingBooking = await Booking.findOne({
      room,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is not available for the selected dates' });
    }

    const roomData = await Room.findById(room);
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = roomData.price * nights;

    const booking = new Booking({
      user: userId,
      room,
      checkIn,
      checkOut,
      adults,
      children,
      totalPrice,
      paymentMethod,
      specialRequests,
    });

    await booking.save();
    
    // Add booking to room
    roomData.bookings.push(booking._id);
    await roomData.save();
    
    await sendBookingConfirmationEmail(req.user.email, booking);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('user room')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBookings: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user room');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    booking.status = status;
    await booking.save();
    
    if (status === 'cancelled') {
      await sendBookingCancellationEmail(booking.user.email, booking);
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate, endDate, groupBy;
    
    const now = new Date();
    
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        endDate = new Date(now);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }
    
    const bookings = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const totalBookings = await Booking.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" }
        }
      }
    ]);
    
    res.json({
      bookings,
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      period
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  getBookingStats,
};