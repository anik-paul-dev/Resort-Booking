const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a feature name'],
    trim: true,
    maxlength: [100, 'Feature name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a feature description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add a feature image']
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

module.exports = mongoose.model('Feature', FeatureSchema);