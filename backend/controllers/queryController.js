const Query = require('../models/Query');

// @desc    Get all queries
// @route   GET /api/queries
// @access  Private (Admin only)
exports.getQueries = async (req, res, next) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single query
// @route   GET /api/queries/:id
// @access  Private (Admin only)
exports.getQuery = async (req, res, next) => {
  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: `Query not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new query
// @route   POST /api/queries
// @access  Public
exports.createQuery = async (req, res, next) => {
  try {
    const query = await Query.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update query
// @route   PUT /api/queries/:id
// @access  Private (Admin only)
exports.updateQuery = async (req, res, next) => {
  try {
    const query = await Query.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: `Query not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete query
// @route   DELETE /api/queries/:id
// @access  Private (Admin only)
exports.deleteQuery = async (req, res, next) => {
  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: `Query not found with id of ${req.params.id}`
      });
    }

    query.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};