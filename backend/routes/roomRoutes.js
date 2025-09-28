const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoomById,
  getRecommendedRooms,
  checkAvailability,
  getRoomAvailability,
} = require('../controllers/roomController');

// Get all rooms with filtering and pagination
router.get('/', getRooms);

// Get room by ID
router.get('/:id', getRoomById);

// Get recommended rooms
router.get('/recommended', getRecommendedRooms);

// Check room availability
router.post('/check-availability', checkAvailability);

// Get room availability calendar
router.get('/:id/availability', getRoomAvailability);

module.exports = router;