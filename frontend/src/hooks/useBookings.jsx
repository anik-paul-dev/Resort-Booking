import { useState, useEffect } from 'react'
import api from '../services/api'

export const useBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get user bookings
  const getUserBookings = async () => {
    setLoading(true)
    try {
      const response = await api.get('/bookings')
      setBookings(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings')
      setLoading(false)
    }
  }

  // Create a new booking
  const createBooking = async (bookingData) => {
    setLoading(true)
    try {
      const response = await api.post('/bookings', bookingData)
      setBookings([...bookings, response.data])
      setLoading(false)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking')
      setLoading(false)
      throw err
    }
  }

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    setLoading(true)
    try {
      const response = await api.put(`/bookings/${bookingId}/cancel`)
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? response.data : booking
      ))
      setLoading(false)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking')
      setLoading(false)
      throw err
    }
  }

  // Get a single booking by ID
  const getBooking = async (bookingId) => {
    setLoading(true)
    try {
      const response = await api.get(`/bookings/${bookingId}`)
      setLoading(false)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch booking')
      setLoading(false)
      throw err
    }
  }

  useEffect(() => {
    getUserBookings()
  }, [])

  return {
    bookings,
    loading,
    error,
    getUserBookings,
    createBooking,
    cancelBooking,
    getBooking
  }
}