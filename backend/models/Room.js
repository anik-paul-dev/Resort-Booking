const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a room name'],
    trim: true,
    maxlength: [100, 'Room name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a room description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one room image']
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please add a price per night'],
    min: [0, 'Price must be at least 0']
  },
  capacity: {
    adults: {
      type: Number,
      required: [true, 'Please add adult capacity'],
      min: [1, 'Adult capacity must be at least 1']
    },
    children: {
      type: Number,
      required: [true, 'Please add children capacity'],
      min: [0, 'Children capacity must be at least 0']
    }
  },
  bedType: {
    type: String,
    required: [true, 'Please add bed type'],
    maxlength: [50, 'Bed type cannot be more than 50 characters']
  },
  bathroom: {
    type: String,
    required: [true, 'Please add bathroom information'],
    maxlength: [100, 'Bathroom info cannot be more than 100 characters']
  },
  internet: {
    type: String,
    required: [true, 'Please add internet information'],
    maxlength: [100, 'Internet info cannot be more than 100 characters']
  },
  features: {
    type: [String],
    required: [true, 'Please add at least one feature']
  },
  facilities: {
    type: [String],
    required: [true, 'Please add at least one facility']
  },
  size: {
    type: Number,
    required: [true, 'Please add room size'],
    min: [0, 'Room size must be at least 0']
  },
  available: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for bookings
RoomSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'room',
  justOne: false
});

// Virtual for reviews
RoomSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'room',
  justOne: false
});

module.exports = mongoose.model('Room', RoomSchema);