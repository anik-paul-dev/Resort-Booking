import api from './api'

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats')
  return response.data
}

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users')
  return response.data
}

export const getAdminBookings = async () => {
  const response = await api.get('/admin/bookings')
  return response.data
}

export const getAdminReviews = async () => {
  const response = await api.get('/admin/reviews')
  return response.data
}

export const getAdminQueries = async () => {
  const response = await api.get('/admin/queries')
  return response.data
}

// Room management
export const createRoom = async (roomData) => {
  const response = await api.post('/admin/rooms', roomData)
  return response.data
}

export const updateRoom = async (id, roomData) => {
  const response = await api.put(`/admin/rooms/${id}`, roomData)
  return response.data
}

export const deleteRoom = async (id) => {
  const response = await api.delete(`/admin/rooms/${id}`)
  return response.data
}

// Facility management
export const createFacility = async (facilityData) => {
  const response = await api.post('/admin/facilities', facilityData)
  return response.data
}

export const updateFacility = async (id, facilityData) => {
  const response = await api.put(`/admin/facilities/${id}`, facilityData)
  return response.data
}

export const deleteFacility = async (id) => {
  const response = await api.delete(`/admin/facilities/${id}`)
  return response.data
}

// Feature management
export const createFeature = async (featureData) => {
  const response = await api.post('/admin/features', featureData)
  return response.data
}

export const updateFeature = async (id, featureData) => {
  const response = await api.put(`/admin/features/${id}`, featureData)
  return response.data
}

export const deleteFeature = async (id) => {
  const response = await api.delete(`/admin/features/${id}`)
  return response.data
}

// Carousel management
export const createCarousel = async (carouselData) => {
  const response = await api.post('/admin/carousels', carouselData)
  return response.data
}

export const updateCarousel = async (id, carouselData) => {
  const response = await api.put(`/admin/carousels/${id}`, carouselData)
  return response.data
}

export const deleteCarousel = async (id) => {
  const response = await api.delete(`/admin/carousels/${id}`)
  return response.data
}

// User management
export const updateUser = async (id, userData) => {
  const response = await api.put(`/admin/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`)
  return response.data
}

// Review management
export const updateReview = async (id, reviewData) => {
  const response = await api.put(`/admin/reviews/${id}`, reviewData)
  return response.data
}

export const deleteReview = async (id) => {
  const response = await api.delete(`/admin/reviews/${id}`)
  return response.data
}

// Query management
export const updateQuery = async (id, queryData) => {
  const response = await api.put(`/admin/queries/${id}`, queryData)
  return response.data
}

export const deleteQuery = async (id) => {
  const response = await api.delete(`/admin/queries/${id}`)
  return response.data
}

// Settings management
export const updateSettings = async (settingsData) => {
  const response = await api.put('/admin/settings', settingsData)
  return response.data
}