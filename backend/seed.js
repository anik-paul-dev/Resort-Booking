const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'greatgatsbyontheway2.o@gmail.com',
        password: 'admin1',
        role: 'admin',
        isActive: true,
        isVerified: true
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();