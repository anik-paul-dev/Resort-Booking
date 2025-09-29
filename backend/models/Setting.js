const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Asian Resort'
  },
  siteEmail: {
    type: String,
    default: 'info@asianresort.com'
  },
  sitePhone: {
    type: String,
    default: '+62 123 456 7890'
  },
  siteAddress: {
    type: String,
    default: '123 Paradise Beach, Bali, Indonesia'
  },
  bookingEnabled: {
    type: Boolean,
    default: true
  },
  bookingMessage: {
    type: String,
    default: ''
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'We are currently undergoing maintenance. Please check back later.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// There will only be one settings document in the database
SettingSchema.statics.getSettings = async function() {
  let settings = await this.findOne({});
  
  if (!settings) {
    settings = await this.create({});
  }
  
  return settings;
};

module.exports = mongoose.model('Setting', SettingSchema);