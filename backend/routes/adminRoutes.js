const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const {
  getDashboardStats,
  getUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getSettings,
  updateSettings,
} = require('../controllers/adminController');

// Get dashboard stats
router.get('/dashboard', admin, getDashboardStats);

// Get all users
router.get('/users', admin, getUsers);

// Get user by ID
router.get('/users/:id', admin, getUserById);

// Update user status
router.put('/users/:id/status', admin, updateUserStatus);

// Delete user
router.delete('/users/:id', admin, deleteUser);

// Get settings
router.get('/settings', admin, getSettings);

// Update settings
router.put('/settings', admin, updateSettings);

module.exports = router;