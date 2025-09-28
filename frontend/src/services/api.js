import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchRooms = (params) => api.get('/rooms', { params });
export const fetchRoomById = (id) => api.get(`/rooms/${id}`);
export const fetchRecommendedRooms = (roomId, limit) => 
  api.get('/rooms/recommended', { params: { roomId, limit } });
export const checkRoomAvailability = (roomId, checkIn, checkOut) => 
  api.post('/rooms/check-availability', { roomId, checkIn, checkOut });
export const fetchRoomAvailability = (roomId, year, month) => 
  api.get(`/rooms/${roomId}/availability`, { params: { year, month } });

export const fetchFeatures = (params) => api.get('/features', { params });
export const fetchFeatureById = (id) => api.get(`/features/${id}`);

export const fetchFacilities = (params) => api.get('/facilities', { params });
export const fetchFacilityById = (id) => api.get(`/facilities/${id}`);

export const fetchCarousel = (params) => api.get('/carousel', { params });
export const fetchCarouselById = (id) => api.get(`/carousel/${id}`);

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const fetchUserBookings = () => api.get('/users/bookings');
export const fetchUserBookingById = (id) => api.get(`/users/bookings/${id}`);
export const cancelBooking = (id) => api.put(`/users/bookings/${id}/cancel`);

export const fetchUserReviews = () => api.get('/users/reviews');
export const submitReview = (reviewData) => api.post('/users/reviews', reviewData);

export const createQuery = (queryData) => api.post('/queries', queryData);

export const fetchAdminDashboard = () => api.get('/admin/dashboard');
export const fetchAdminUsers = (params) => api.get('/admin/users', { params });
export const fetchAdminUserById = (id) => api.get(`/admin/users/${id}`);
export const updateUserStatus = (id, statusData) => api.put(`/admin/users/${id}/status`, statusData);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const fetchAdminBookings = (params) => api.get('/bookings', { params });
export const fetchAdminBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, statusData) => api.put(`/bookings/${id}/status`, statusData);
export const fetchBookingStats = (period) => api.get(`/bookings/stats/${period}`);

export const fetchAdminFeatures = (params) => api.get('/features', { params });
export const createFeature = (featureData) => api.post('/features', featureData);
export const updateFeature = (id, featureData) => api.put(`/features/${id}`, featureData);
export const deleteFeature = (id) => api.delete(`/features/${id}`);

export const fetchAdminFacilities = (params) => api.get('/facilities', { params });
export const createFacility = (facilityData) => api.post('/facilities', facilityData);
export const updateFacility = (id, facilityData) => api.put(`/facilities/${id}`, facilityData);
export const deleteFacility = (id) => api.delete(`/facilities/${id}`);

export const fetchAdminCarousel = (params) => api.get('/carousel', { params });
export const createCarousel = (carouselData) => api.post('/carousel', carouselData);
export const updateCarousel = (id, carouselData) => api.put(`/carousel/${id}`, carouselData);
export const deleteCarousel = (id) => api.delete(`/carousel/${id}`);

export const fetchAdminQueries = (params) => api.get('/queries', { params });
export const fetchQueryById = (id) => api.get(`/queries/${id}`);
export const updateQueryStatus = (id, statusData) => api.put(`/queries/${id}/status`, statusData);
export const deleteQuery = (id) => api.delete(`/queries/${id}`);

export const fetchAdminReviews = (params) => api.get('/reviews', { params });
export const fetchReviewById = (id) => api.get(`/reviews/${id}`);
export const updateReviewStatus = (id, statusData) => api.put(`/reviews/${id}/status`, statusData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);
export const fetchReviewStats = (period) => api.get(`/reviews/stats/${period}`);

export const fetchSettings = () => api.get('/admin/settings');
export const updateSettings = (settingsData) => api.put('/admin/settings', settingsData);

export default api;