import api from './api'

export const getBookings = async () => {
  const response = await api.get('/bookings')
  return response.data
}

export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`)
  return response.data
}

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData)
  return response.data
}

export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`)
  return response.data
}