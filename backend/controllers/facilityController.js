const Facility = require('../models/Facility');

// @desc    Get all facilities
// @route   GET /api/facilities
// @access  Public
exports.getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single facility
// @route   GET /api/facilities/:id
// @access  Public
exports.getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: `Facility not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: facility
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new facility
// @route   POST /api/facilities
// @access  Private (Admin only)
exports.createFacility = async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body);

    res.status(201).json({
      success: true,
      data: facility
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update facility
// @route   PUT /api/facilities/:id
// @access  Private (Admin only)
exports.updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: `Facility not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: facility
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete facility
// @route   DELETE /api/facilities/:id
// @access  Private (Admin only)
exports.deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: `Facility not found with id of ${req.params.id}`
      });
    }

    facility.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};