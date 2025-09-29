const Carousel = require('../models/Carousel');

// @desc    Get all carousels
// @route   GET /api/carousels
// @access  Public
exports.getCarousels = async (req, res, next) => {
  try {
    const carousels = await Carousel.find({ isActive: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: carousels.length,
      data: carousels
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single carousel
// @route   GET /api/carousels/:id
// @access  Public
exports.getCarousel = async (req, res, next) => {
  try {
    const carousel = await Carousel.findById(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: `Carousel not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: carousel
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new carousel
// @route   POST /api/carousels
// @access  Private (Admin only)
exports.createCarousel = async (req, res, next) => {
  try {
    const carousel = await Carousel.create(req.body);

    res.status(201).json({
      success: true,
      data: carousel
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update carousel
// @route   PUT /api/carousels/:id
// @access  Private (Admin only)
exports.updateCarousel = async (req, res, next) => {
  try {
    const carousel = await Carousel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: `Carousel not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: carousel
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete carousel
// @route   DELETE /api/carousels/:id
// @access  Private (Admin only)
exports.deleteCarousel = async (req, res, next) => {
  try {
    const carousel = await Carousel.findById(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: `Carousel not found with id of ${req.params.id}`
      });
    }

    carousel.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};