const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a carousel title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a carousel description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add a carousel image']
  },
  link: {
    type: String,
    maxlength: [200, 'Link cannot be more than 200 characters']
  },
  buttonText: {
    type: String,
    maxlength: [50, 'Button text cannot be more than 50 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carousel', CarouselSchema);