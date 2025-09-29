const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { body, validationResult } = require('express-validator');

// @route   POST /api/queries
// @desc    Submit a query
// @access  Public
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('subject', 'Subject is required').not().isEmpty(),
    body('message', 'Message is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      // Create query
      const query = new Query({
        name,
        email,
        subject,
        message
      });

      await query.save();
      
      res.status(201).json({ message: 'Query submitted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;