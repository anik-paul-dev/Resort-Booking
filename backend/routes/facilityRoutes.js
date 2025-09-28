const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const admin = require('../middleware/admin');
const {
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
} = require('../controllers/facilityController');

// Get all facilities
router.get('/', getFacilities);

// Get facility by ID
router.get('/:id', getFacilityById);

// Create facility (admin)
router.post(
  '/',
  admin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  createFacility
);

// Update facility (admin)
router.put(
  '/:id',
  admin,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  ],
  updateFacility
);

// Delete facility (admin)
router.delete('/:id', admin, deleteFacility);

module.exports = router;