// frontend/src/hooks/useAdmin.jsx
import { useState, useEffect } from 'react'
import {
  getAdminStats,
  getAdminUsers,
  getAdminBookings,
  getAdminReviews,
  getAdminQueries,
  updateRoom,
  createRoom,
  deleteRoom,
  updateFacility,
  createFacility,
  deleteFacility,
  updateFeature,
  createFeature,
  deleteFeature,
  updateCarousel,
  createCarousel,
  deleteCarousel,
  updateUser,
  deleteUser,
  updateReview,
  deleteReview,
  updateQuery,
  deleteQuery,
  updateSettings
} from '../services/admin'

export const useAdmin = () => {
  const [stats, setStats] = useState(null) // Changed from {} to null to handle undefined state
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [reviews, setReviews] = useState([])
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch admin data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const statsData = await getAdminStats()
        setStats(statsData)
        
        const usersData = await getAdminUsers()
        setUsers(usersData)
        
        const bookingsData = await getAdminBookings()
        setBookings(bookingsData)
        
        const reviewsData = await getAdminReviews()
        setReviews(reviewsData)
        
        const queriesData = await getAdminQueries()
        setQueries(queriesData)
        
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Room management
  const addRoom = async (roomData) => {
    setLoading(true)
    try {
      const response = await createRoom(roomData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room')
      setLoading(false)
      throw err
    }
  }

  const editRoom = async (id, roomData) => {
    setLoading(true)
    try {
      const response = await updateRoom(id, roomData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room')
      setLoading(false)
      throw err
    }
  }

  const removeRoom = async (id) => {
    setLoading(true)
    try {
      const response = await deleteRoom(id)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete room')
      setLoading(false)
      throw err
    }
  }

  // Facility management
  const addFacility = async (facilityData) => {
    setLoading(true)
    try {
      const response = await createFacility(facilityData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create facility')
      setLoading(false)
      throw err
    }
  }

  const editFacility = async (id, facilityData) => {
    setLoading(true)
    try {
      const response = await updateFacility(id, facilityData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update facility')
      setLoading(false)
      throw err
    }
  }

  const removeFacility = async (id) => {
    setLoading(true)
    try {
      const response = await deleteFacility(id)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete facility')
      setLoading(false)
      throw err
    }
  }

  // Feature management
  const addFeature = async (featureData) => {
    setLoading(true)
    try {
      const response = await createFeature(featureData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create feature')
      setLoading(false)
      throw err
    }
  }

  const editFeature = async (id, featureData) => {
    setLoading(true)
    try {
      const response = await updateFeature(id, featureData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update feature')
      setLoading(false)
      throw err
    }
  }

  const removeFeature = async (id) => {
    setLoading(true)
    try {
      const response = await deleteFeature(id)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete feature')
      setLoading(false)
      throw err
    }
  }

  // Carousel management
  const addCarousel = async (carouselData) => {
    setLoading(true)
    try {
      const response = await createCarousel(carouselData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create carousel')
      setLoading(false)
      throw err
    }
  }

  const editCarousel = async (id, carouselData) => {
    setLoading(true)
    try {
      const response = await updateCarousel(id, carouselData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update carousel')
      setLoading(false)
      throw err
    }
  }

  const removeCarousel = async (id) => {
    setLoading(true)
    try {
      const response = await deleteCarousel(id)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete carousel')
      setLoading(false)
      throw err
    }
  }

  // User management
  const editUser = async (id, userData) => {
    setLoading(true)
    try {
      const response = await updateUser(id, userData)
      // Update users list
      setUsers(users.map(user => user._id === id ? response.user : user))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user')
      setLoading(false)
      throw err
    }
  }

  const removeUser = async (id) => {
    setLoading(true)
    try {
      const response = await deleteUser(id)
      // Update users list
      setUsers(users.filter(user => user._id !== id))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user')
      setLoading(false)
      throw err
    }
  }

  // Review management
  const editReview = async (id, reviewData) => {
    setLoading(true)
    try {
      const response = await updateReview(id, reviewData)
      // Update reviews list
      setReviews(reviews.map(review => review._id === id ? response.review : review))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review')
      setLoading(false)
      throw err
    }
  }

  const removeReview = async (id) => {
    setLoading(true)
    try {
      const response = await deleteReview(id)
      // Update reviews list
      setReviews(reviews.filter(review => review._id !== id))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete review')
      setLoading(false)
      throw err
    }
  }

  // Query management
  const editQuery = async (id, queryData) => {
    setLoading(true)
    try {
      const response = await updateQuery(id, queryData)
      // Update queries list
      setQueries(queries.map(query => query._id === id ? response.query : query))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update query')
      setLoading(false)
      throw err
    }
  }

  const removeQuery = async (id) => {
    setLoading(true)
    try {
      const response = await deleteQuery(id)
      // Update queries list
      setQueries(queries.filter(query => query._id !== id))
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete query')
      setLoading(false)
      throw err
    }
  }

  // Settings management
  const updateSiteSettings = async (settingsData) => {
    setLoading(true)
    try {
      const response = await updateSettings(settingsData)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings')
      setLoading(false)
      throw err
    }
  }

  return {
    stats,
    users,
    bookings,
    reviews,
    queries,
    loading,
    error,
    addRoom,
    editRoom,
    removeRoom,
    addFacility,
    editFacility,
    removeFacility,
    addFeature,
    editFeature,
    removeFeature,
    addCarousel,
    editCarousel,
    removeCarousel,
    editUser,
    removeUser,
    editReview,
    removeReview,
    editQuery,
    removeQuery,
    updateSiteSettings
  }
}