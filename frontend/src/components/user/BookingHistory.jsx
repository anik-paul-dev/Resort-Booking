import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Badge, Alert } from 'react-bootstrap'
import { FaCalendarAlt, FaHotel, FaMoneyBillWave, FaFileDownload } from 'react-icons/fa'
import { useBookings } from '../../hooks/useBookings'
import LoadingSpinner from '../common/LoadingSpinner'

const BookingHistory = () => {
  const { bookings, loading, cancelBooking } = useBookings()
  const [cancellingId, setCancellingId] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

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

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setCancellingId(bookingId)
      try {
        await cancelBooking(bookingId)
        setShowSuccess(true)
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } catch (err) {
        setShowError(true)
        
        // Hide error message after 3 seconds
        setTimeout(() => {
          setShowError(false)
        }, 3000)
      }
      setCancellingId(null)
    }
  }

  const handleDownloadReceipt = (booking) => {
    // In a real app, this would generate and download a PDF receipt
    alert(`Receipt for booking ${booking._id} would be downloaded here`)
  }

  const isUpcoming = (checkOut) => {
    return new Date(checkOut) >= new Date()
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h2 className="mb-4">Booking History</h2>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Booking cancelled successfully!
        </Alert>
      )}
      
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Failed to cancel booking. Please try again.
        </Alert>
      )}
      
      {bookings.length > 0 ? (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Room</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Guests</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>#{booking._id.substring(0, 8)}</td>
                    <td>{booking.room?.name}</td>
                    <td>{formatDate(booking.checkIn)}</td>
                    <td>{formatDate(booking.checkOut)}</td>
                    <td>{booking.adults} Adults, {booking.children} Children</td>
                    <td>${booking.totalPrice}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>
                      <div className="d-flex">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          href={`/user/bookings/${booking._id}`}
                        >
                          View
                        </Button>
                        
                        {booking.status === 'confirmed' && isUpcoming(booking.checkOut) && (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancellingId === booking._id}
                          >
                            {cancellingId === booking._id ? 'Cancelling...' : 'Cancel'}
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="ms-2"
                          onClick={() => handleDownloadReceipt(booking)}
                        >
                          <FaFileDownload />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body className="text-center py-5">
            <FaHotel className="mb-3 text-muted" size={48} />
            <h4>No Bookings Found</h4>
            <p className="text-muted">You haven't made any bookings yet.</p>
            <Button variant="primary" href="/rooms">
              Browse Rooms
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default BookingHistory