const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  openingHours: {
    type: String,
  },
}, {
  timestamps: true,
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;