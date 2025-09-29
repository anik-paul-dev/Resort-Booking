const Feature = require('../models/Feature');

// @desc    Get all features
// @route   GET /api/features
// @access  Public
exports.getFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: features.length,
      data: features
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single feature
// @route   GET /api/features/:id
// @access  Public
exports.getFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: `Feature not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: feature
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new feature
// @route   POST /api/features
// @access  Private (Admin only)
exports.createFeature = async (req, res, next) => {
  try {
    const feature = await Feature.create(req.body);

    res.status(201).json({
      success: true,
      data: feature
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update feature
// @route   PUT /api/features/:id
// @access  Private (Admin only)
exports.updateFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: `Feature not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: feature
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete feature
// @route   DELETE /api/features/:id
// @access  Private (Admin only)
exports.deleteFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: `Feature not found with id of ${req.params.id}`
      });
    }

    feature.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};