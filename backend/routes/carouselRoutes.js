const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const admin = require('../middleware/admin');
const {
  getCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} = require('../controllers/carouselController');

// Get all carousels
router.get('/', getCarousels);

// Get carousel by ID
router.get('/:id', getCarouselById);

// Create carousel (admin)
router.post(
  '/',
  admin,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('image').trim().notEmpty().withMessage('Image is required'),
  ],
  createCarousel
);

// Update carousel (admin)
router.put(
  '/:id',
  admin,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('image').optional().trim().notEmpty().withMessage('Image cannot be empty'),
  ],
  updateCarousel
);

// Delete carousel (admin)
router.delete('/:id', admin, deleteCarousel);

module.exports = router;