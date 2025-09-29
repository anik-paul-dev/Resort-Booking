const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Create storage engine for room images
const roomStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resort/rooms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

// Create storage engine for facility images
const facilityStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resort/facilities',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

// Create storage engine for carousel images
const carouselStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resort/carousel',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

// Create storage engine for user avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resort/users',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

// Create upload middleware
exports.uploadRoomImages = multer({ storage: roomStorage }).array('images', 5);
exports.uploadFacilityImage = multer({ storage: facilityStorage }).single('image');
exports.uploadCarouselImage = multer({ storage: carouselStorage }).single('image');
exports.uploadAvatar = multer({ storage: avatarStorage }).single('avatar');