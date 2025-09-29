import { useState, useEffect } from 'react'
import {
  getRooms,
  getRoomById,
  getFeaturedRooms,
  getFacilities,
  getFeatures,
  getReviews,
  getCarousels,
  getBookings,
  createBooking,
  submitQuery
} from '../services/rooms'

export const useRooms = (roomId) => {
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState(null)
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [facilities, setFacilities] = useState([])
  const [features, setFeatures] = useState([])
  const [reviews, setReviews] = useState([])
  const [carousels, setCarousels] = useState([])
  const [bookings, setBookings] = useState([])
  const [recommendedRooms, setRecommendedRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const roomsData = await getRooms()
        setRooms(roomsData)
        
        const featuredData = await getFeaturedRooms()
        setFeaturedRooms(featuredData)
        
        const facilitiesData = await getFacilities()
        setFacilities(facilitiesData)
        
        const featuresData = await getFeatures()
        setFeatures(featuresData)
        
        const reviewsData = await getReviews()
        setReviews(reviewsData)
        
        const carouselsData = await getCarousels()
        setCarousels(carouselsData)
        
        const bookingsData = await getBookings()
        setBookings(bookingsData)
        
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        setLoading(true)
        try {
          const roomData = await getRoomById(roomId)
          setRoom(roomData)
          
          // Get recommended rooms based on price range
          const allRooms = await getRooms()
          const minPrice = roomData.pricePerNight * 0.8
          const maxPrice = roomData.pricePerNight * 1.2
          
          const recommended = allRooms
            .filter(r => 
              r._id !== roomId && 
              r.pricePerNight >= minPrice && 
              r.pricePerNight <= maxPrice
            )
            .slice(0, 3)
            
          setRecommendedRooms(recommended)
          setLoading(false)
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch room')
          setLoading(false)
        }
      }
    }

    fetchRoom()
  }, [roomId])

  return {
    rooms,
    room,
    featuredRooms,
    facilities,
    features,
    reviews,
    carousels,
    bookings,
    recommendedRooms,
    loading,
    error
  }
}

export const useBookings = () => {
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [bookingSuccess, setBookingSuccess] = useState(null)

  const createNewBooking = async (bookingData) => {
    setBookingLoading(true)
    setBookingError(null)
    setBookingSuccess(null)
    
    try {
      const response = await createBooking(bookingData)
      setBookingSuccess(response.message)
      setBookingLoading(false)
      return response
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Failed to create booking')
      setBookingLoading(false)
      throw err
    }
  }

  return {
    createBooking: createNewBooking,
    bookingLoading,
    bookingError,
    bookingSuccess
  }
}

export const useQueries = () => {
  const [queryLoading, setQueryLoading] = useState(false)
  const [queryError, setQueryError] = useState(null)
  const [querySuccess, setQuerySuccess] = useState(null)

  const submitNewQuery = async (queryData) => {
    setQueryLoading(true)
    setQueryError(null)
    setQuerySuccess(null)
    
    try {
      const response = await submitQuery(queryData)
      setQuerySuccess(response.message)
      setQueryLoading(false)
      return response
    } catch (err) {
      setQueryError(err.response?.data?.message || 'Failed to submit query')
      setQueryLoading(false)
      throw err
    }
  }

  return {
    submitQuery: submitNewQuery,
    queryLoading,
    queryError,
    querySuccess
  }
}