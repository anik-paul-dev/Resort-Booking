// User roles
const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Booking statuses
const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};

// Payment statuses
const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
};

// Payment methods
const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
};

// Review statuses
const REVIEW_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Query statuses
const QUERY_STATUSES = {
  PENDING: 'pending',
  READ: 'read',
  REJECTED: 'rejected',
};

// Room capacity
const ROOM_CAPACITY = {
  ADULTS_MIN: 1,
  ADULTS_MAX: 10,
  CHILDREN_MIN: 0,
  CHILDREN_MAX: 5,
};

// Rating scale
const RATING_SCALE = {
  MIN: 1,
  MAX: 5,
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// API response messages
const RESPONSE_MESSAGES = {
  SUCCESS: 'Success',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  VALIDATION_ERROR: 'Validation error',
  DUPLICATE_ENTRY: 'Duplicate entry',
  SERVER_ERROR: 'Internal server error',
};

module.exports = {
  USER_ROLES,
  BOOKING_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  REVIEW_STATUSES,
  QUERY_STATUSES,
  ROOM_CAPACITY,
  RATING_SCALE,
  PAGINATION,
  RESPONSE_MESSAGES,
};