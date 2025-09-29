const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a facility name'],
    trim: true,
    maxlength: [100, 'Facility name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a facility description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add a facility image']
  },
  icon: {
    type: String,
    required: [true, 'Please add an icon name'],
    maxlength: [50, 'Icon name cannot be more than 50 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Facility', FacilitySchema);