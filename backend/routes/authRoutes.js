const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  logout,
} = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// Verify Email
router.get('/verify-email/:id', verifyEmail);

// Forgot Password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please enter a valid email')],
  forgotPassword
);

// Reset Password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  resetPassword
);

// Get Current User
router.get('/me', auth, getCurrentUser);

// Update Profile
router.put(
  '/profile',
  auth,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
  ],
  updateProfile
);

// Logout
router.post('/logout', auth, logout);

module.exports = router;