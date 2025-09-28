const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  profileImage: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;