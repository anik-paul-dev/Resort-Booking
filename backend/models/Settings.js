const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Resort Booking',
  },
  logo: {
    type: String,
  },
  favicon: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  contactAddress: {
    type: String,
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
  },
  isMaintenanceMode: {
    type: Boolean,
    default: false,
  },
  maintenanceMessage: {
    type: String,
  },
  isBookingPaused: {
    type: Boolean,
    default: false,
  },
  bookingPauseMessage: {
    type: String,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  taxRate: {
    type: Number,
    default: 0,
  },
  bookingPolicy: {
    type: String,
  },
  cancellationPolicy: {
    type: String,
  },
  paymentMethods: {
    credit_card: { type: Boolean, default: true },
    debit_card: { type: Boolean, default: true },
    paypal: { type: Boolean, default: true },
    bank_transfer: { type: Boolean, default: true },
  },
}, {
  timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;