// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    CURRENT_USER: '/api/auth/me',
    FORGOT_PASSWORD: '/api/auth/forgotpassword',
    RESET_PASSWORD: '/api/auth/resetpassword/:token'
  },
  ROOMS: {
    GET_ALL: '/api/rooms',
    GET_BY_ID: '/api/rooms/:id',
    GET_FEATURED: '/api/rooms/featured',
    CREATE: '/api/admin/rooms',
    UPDATE: '/api/admin/rooms/:id',
    DELETE: '/api/admin/rooms/:id'
  },
  FACILITIES: {
    GET_ALL: '/api/facilities',
    CREATE: '/api/admin/facilities',
    UPDATE: '/api/admin/facilities/:id',
    DELETE: '/api/admin/facilities/:id'
  },
  FEATURES: {
    GET_ALL: '/api/features',
    CREATE: '/api/admin/features',
    UPDATE: '/api/admin/features/:id',
    DELETE: '/api/admin/features/:id'
  },
  BOOKINGS: {
    GET_ALL: '/api/bookings',
    CREATE: '/api/bookings',
    GET_USER_BOOKINGS: '/api/bookings/user',
    CANCEL: '/api/bookings/:id/cancel'
  },
  REVIEWS: {
    GET_ALL: '/api/reviews',
    CREATE: '/api/reviews',
    UPDATE: '/api/admin/reviews/:id',
    DELETE: '/api/admin/reviews/:id'
  },
  CAROUSELS: {
    GET_ALL: '/api/carousels',
    CREATE: '/api/admin/carousels',
    UPDATE: '/api/admin/carousels/:id',
    DELETE: '/api/admin/carousels/:id'
  },
  QUERIES: {
    GET_ALL: '/api/queries',
    CREATE: '/api/queries',
    UPDATE: '/api/admin/queries/:id',
    DELETE: '/api/admin/queries/:id'
  },
  USERS: {
    GET_ALL: '/api/admin/users',
    UPDATE: '/api/admin/users/:id',
    DELETE: '/api/admin/users/:id'
  },
  ADMIN: {
    STATS: '/api/admin/stats',
    SETTINGS: '/api/admin/settings'
  }
}

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
}

// Room status
export const ROOM_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  MAINTENANCE: 'maintenance'
}

// Review status
export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

// Query status
export const QUERY_STATUS = {
  PENDING: 'pending',
  READ: 'read',
  REPLIED: 'replied',
  CLOSED: 'closed'
}

// Image upload settings
export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}

// Pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DATETIME: 'MMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD'
}