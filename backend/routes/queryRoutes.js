const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const admin = require('../middleware/admin');
const {
  getQueries,
  getQueryById,
  createQuery,
  updateQueryStatus,
  deleteQuery,
} = require('../controllers/queryController');

// Get all queries (admin)
router.get('/', admin, getQueries);

// Get query by ID (admin)
router.get('/:id', admin, getQueryById);

// Create query (public)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  createQuery
);

// Update query status (admin)
router.put(
  '/:id/status',
  admin,
  [
    body('status').isIn(['pending', 'read', 'rejected']).withMessage('Invalid status'),
  ],
  updateQueryStatus
);

// Delete query (admin)
router.delete('/:id', admin, deleteQuery);

module.exports = router;