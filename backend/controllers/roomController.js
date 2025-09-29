const Room = require('../models/Room');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ available: true });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Room not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured rooms
// @route   GET /api/rooms/featured
// @access  Public
exports.getFeaturedRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ available: true, isFeatured: true }).limit(6);

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new room
// @route   POST /api/rooms
// @access  Private (Admin only)
exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private (Admin only)
exports.updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Room not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private (Admin only)
exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Room not found with id of ${req.params.id}`
      });
    }

    room.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};