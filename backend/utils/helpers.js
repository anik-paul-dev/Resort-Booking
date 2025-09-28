const calculateNights = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateTotalPrice = (pricePerNight, nights, taxRate = 0) => {
  const subtotal = pricePerNight * nights;
  const tax = subtotal * (taxRate / 100);
  return subtotal + tax;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const generateBookingId = () => {
  return 'BK' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, at least one uppercase, one lowercase, one number
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

module.exports = {
  calculateNights,
  calculateTotalPrice,
  formatDate,
  formatCurrency,
  generateBookingId,
  validateEmail,
  validatePassword,
};