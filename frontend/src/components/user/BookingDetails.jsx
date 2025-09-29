import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col, Button, Badge, Alert, Image } from 'react-bootstrap'
import { FaCalendarAlt, FaHotel, FaMoneyBillWave, FaUser, FaArrowLeft, FaFileDownload } from 'react-icons/fa'
import { useBookings } from '../../hooks/useBookings'
import LoadingSpinner from '../common/LoadingSpinner'

const BookingDetails = () => {
  const { id } = useParams()
  const { getBooking, loading } = useBookings()
  const [booking, setBooking] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBooking(id)
        setBooking(bookingData)
      } catch (err) {
        console.error('Error fetching booking:', err)
      }
    }

    fetchBooking()
  }, [id, getBooking])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>
      case 'pending':
        return <Badge bg="warning">Pending</Badge>
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>
      case 'completed':
        return <Badge bg="info">Completed</Badge>
      default:
        return <Badge bg="secondary">{status}</Badge>
    }
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert(`Receipt for booking ${booking._id} would be downloaded here`)
  }

  const isUpcoming = (checkOut) => {
    return new Date(checkOut) >= new Date()
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!booking) {
    return (
      <div className="text-center py-5">
        <h4>Booking not found</h4>
        <Link to="/user/bookings" className="btn btn-primary">
          Back to Bookings
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Link to="/user/bookings" className="btn btn-outline-secondary me-3">
          <FaArrowLeft /> Back
        </Link>
        <h2 className="mb-0">Booking Details</h2>
      </div>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Booking updated successfully!
        </Alert>
      )}
      
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Failed to update booking. Please try again.
        </Alert>
      )}
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>Booking Information</h5>
                  <p><strong>Booking ID:</strong> #{booking._id}</p>
                  <p><strong>Status:</strong> {getStatusBadge(booking.status)}</p>
                  <p><strong>Booking Date:</strong> {formatDate(booking.createdAt)}</p>
                  <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
                </Col>
                <Col md={6}>
                  <h5>Stay Details</h5>
                  <p><strong>Check-in:</strong> {formatDate(booking.checkIn)}</p>
                  <p><strong>Check-out:</strong> {formatDate(booking.checkOut)}</p>
                  <p><strong>Duration:</strong> {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights</p>
                  <p><strong>Guests:</strong> {booking.adults} Adults, {booking.children} Children</p>
                  <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                </Col>
              </Row>
              
              {booking.specialRequests && (
                <div className="mt-3">
                  <h5>Special Requests</h5>
                  <p>{booking.specialRequests}</p>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <h5>Room Information</h5>
              <Row>
                <Col md={4}>
                  {booking.room?.images && booking.room.images.length > 0 && (
                    <Image 
                      src={booking.room.images[0]} 
                      alt={booking.room.name}
                      fluid
                      className="mb-3"
                    />
                  )}
                </Col>
                <Col md={8}>
                  <h4>{booking.room?.name}</h4>
                  <p>{booking.room?.description}</p>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <p><strong>Price per Night:</strong> ${booking.room?.pricePerNight}</p>
                      <p><strong>Capacity:</strong> {booking.room?.capacity?.adults} Adults, {booking.room?.capacity?.children} Children</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Bed Type:</strong> {booking.room?.bedType}</p>
                      <p><strong>Size:</strong> {booking.room?.size} sqm</p>
                    </Col>
                  </Row>
                  
                  <div className="mb-3">
                    <h6>Features</h6>
                    <div className="d-flex flex-wrap">
                      {booking.room?.features?.map((feature, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6>Facilities</h6>
                    <div className="d-flex flex-wrap">
                      {booking.room?.facilities?.map((facility, index) => (
                        <Badge key={index} bg="primary" className="me-2 mb-2">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Booking Summary</h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Room Price:</span>
                  <span>${booking.room?.pricePerNight} x {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Taxes & Fees:</span>
                  <span>$0.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${booking.totalPrice}</span>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleDownloadReceipt}>
                  <FaFileDownload className="me-2" />
                  Download Receipt
                </Button>
                
                {booking.status === 'confirmed' && isUpcoming(booking.checkOut) && (
                  <Button variant="outline-danger">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <h5>Guest Information</h5>
              <p><strong>Name:</strong> {booking.user?.name}</p>
              <p><strong>Email:</strong> {booking.user?.email}</p>
              {booking.user?.phone && <p><strong>Phone:</strong> {booking.user?.phone}</p>}
              {booking.user?.address && <p><strong>Address:</strong> {booking.user?.address}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BookingDetails