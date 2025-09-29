const Setting = require('../models/Setting');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.getSettings();

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    const {
      siteName,
      siteEmail,
      sitePhone,
      siteAddress,
      bookingEnabled,
      bookingMessage,
      maintenanceMode,
      maintenanceMessage
    } = req.body;

    // Find settings (there should only be one document)
    let settings = await Setting.getSettings();

    // Update fields
    settings.siteName = siteName || settings.siteName;
    settings.siteEmail = siteEmail || settings.siteEmail;
    settings.sitePhone = sitePhone || settings.sitePhone;
    settings.siteAddress = siteAddress || settings.siteAddress;
    settings.bookingEnabled = bookingEnabled !== undefined ? bookingEnabled : settings.bookingEnabled;
    settings.bookingMessage = bookingMessage !== undefined ? bookingMessage : settings.bookingMessage;
    settings.maintenanceMode = maintenanceMode !== undefined ? maintenanceMode : settings.maintenanceMode;
    settings.maintenanceMessage = maintenanceMessage !== undefined ? maintenanceMessage : settings.maintenanceMessage;

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (err) {
    next(err);
  }
};