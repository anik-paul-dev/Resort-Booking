import api from './api'

export const getRooms = async () => {
  const response = await api.get('/rooms')
  return response.data
}

export const getRoomById = async (id) => {
  const response = await api.get(`/rooms/${id}`)
  return response.data
}

export const getFeaturedRooms = async () => {
  const response = await api.get('/rooms/featured')
  return response.data
}

export const getFacilities = async () => {
  const response = await api.get('/facilities')
  return response.data
}

export const getFeatures = async () => {
  const response = await api.get('/features')
  return response.data
}

export const getReviews = async () => {
  const response = await api.get('/reviews')
  return response.data
}

export const getCarousels = async () => {
  const response = await api.get('/carousels')
  return response.data
}

export const getBookings = async () => {
  const response = await api.get('/bookings')
  return response.data
}

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData)
  return response.data
}

export const submitQuery = async (queryData) => {
  const response = await api.post('/queries', queryData)
  return response.data
}