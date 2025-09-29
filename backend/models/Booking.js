const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Please add check-in date']
  },
  checkOut: {
    type: Date,
    required: [true, 'Please add check-out date']
  },
  adults: {
    type: Number,
    required: [true, 'Please add number of adults'],
    min: [1, 'At least 1 adult is required']
  },
  children: {
    type: Number,
    default: 0,
    min: [0, 'Children cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please add total price'],
    min: [0, 'Total price must be at least 0']
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash'],
    default: 'credit_card'
  },
  paymentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for number of nights
BookingSchema.virtual('nights').get(function() {
  const diffTime = Math.abs(new Date(this.checkOut) - new Date(this.checkIn));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Booking', BookingSchema);