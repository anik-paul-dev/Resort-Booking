const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Cloudinary URLs
  }],
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      default: 0,
    },
  },
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature',
  }],
  facilities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  size: {
    type: String,
  },
  bedType: {
    type: String,
  },
  view: {
    type: String,
  },
}, {
  timestamps: true,
});

// Virtual for average rating
roomSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / this.reviews.length;
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;