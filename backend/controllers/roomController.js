const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const getRooms = async (req, res) => {
  try {
    const { page = 1, limit = 10, features, facilities, capacity, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = { isActive: true };
    
    if (features) {
      query.features = { $in: features.split(',') };
    }
    if (facilities) {
      query.facilities = { $in: facilities.split(',') };
    }
    if (capacity) {
      query['capacity.adults'] = { $gte: parseInt(capacity) };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const rooms = await Room.find(query)
      .populate('features facilities')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Room.countDocuments(query);

    res.json({
      rooms,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRooms: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('features facilities')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name profileImage'
        }
      });
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Calculate average rating
    const averageRating = room.reviews.length > 0 
      ? room.reviews.reduce((sum, review) => sum + review.rating, 0) / room.reviews.length 
      : 0;
    
    res.json({ ...room.toObject(), averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendedRooms = async (req, res) => {
  try {
    const { roomId, limit = 3 } = req.query;
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Find rooms with similar features, facilities, or price range
    const query = {
      _id: { $ne: roomId },
      isActive: true,
      $or: [
        { features: { $in: room.features } },
        { facilities: { $in: room.facilities } },
        { price: { $gte: room.price * 0.8, $lte: room.price * 1.2 } }
      ]
    };
    
    const recommendedRooms = await Room.find(query)
      .populate('features facilities')
      .limit(limit * 1)
      .exec();
    
    res.json(recommendedRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    
    const bookings = await Booking.find({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });
    
    res.json({ available: bookings.length === 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomAvailability = async (req, res) => {
  try {
    const { roomId, year, month } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const bookings = await Booking.find({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: endDate, $gte: startDate } },
        { checkOut: { $gt: startDate, $lte: endDate } },
        { checkIn: { $lte: startDate }, checkOut: { $gte: endDate } }
      ]
    }).select('checkIn checkOut');
    
    const bookedDates = [];
    bookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      
      for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d).toISOString().split('T')[0]);
      }
    });
    
    res.json({ bookedDates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  getRecommendedRooms,
  checkAvailability,
  getRoomAvailability,
};