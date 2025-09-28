const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const admin = require('../middleware/admin');
const {
  getFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
} = require('../controllers/featureController');

// Get all features
router.get('/', getFeatures);

// Get feature by ID
router.get('/:id', getFeatureById);

// Create feature (admin)
router.post(
  '/',
  admin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  createFeature
);

// Update feature (admin)
router.put(
  '/:id',
  admin,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  ],
  updateFeature
);

// Delete feature (admin)
router.delete('/:id', admin, deleteFeature);

module.exports = router;