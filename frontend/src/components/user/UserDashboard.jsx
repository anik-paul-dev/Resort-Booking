import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import { FaHotel, FaCalendarCheck, FaStar, FaUser, FaCog } from 'react-icons/fa'
import { useBookings } from '../../hooks/useBookings'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../common/LoadingSpinner'

const UserDashboard = () => {
  const { user } = useAuth()
  const { bookings, loading } = useBookings()
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])

  useEffect(() => {
    if (bookings.length > 0) {
      const now = new Date()
      const upcoming = bookings.filter(booking => new Date(booking.checkOut) >= now)
      const past = bookings.filter(booking => new Date(booking.checkOut) < now)
      
      setUpcomingBookings(upcoming)
      setPastBookings(past)
    }
  }, [bookings])

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

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.name}!</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaHotel className="text-primary" size={30} />
              </div>
              <div>
                <h3>{bookings.length}</h3>
                <p className="mb-0">Total Bookings</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaCalendarCheck className="text-success" size={30} />
              </div>
              <div>
                <h3>{upcomingBookings.length}</h3>
                <p className="mb-0">Upcoming Stays</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaStar className="text-warning" size={30} />
              </div>
              <div>
                <h3>0</h3>
                <p className="mb-0">Reviews</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaUser className="text-info" size={30} />
              </div>
              <div>
                <h3>{user?.role === 'admin' ? 'Admin' : 'Guest'}</h3>
                <p className="mb-0">Account Type</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Upcoming Bookings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Upcoming Bookings</h5>
            </Card.Header>
            <Card.Body>
              {upcomingBookings.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
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
                    {upcomingBookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.room?.name}</td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>{formatDate(booking.checkOut)}</td>
                        <td>{booking.adults} Adults, {booking.children} Children</td>
                        <td>${booking.totalPrice}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            href={`/user/bookings/${booking._id}`}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">You have no upcoming bookings.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Past Bookings */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Past Bookings</h5>
            </Card.Header>
            <Card.Body>
              {pastBookings.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastBookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.room?.name}</td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>{formatDate(booking.checkOut)}</td>
                        <td>${booking.totalPrice}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            href={`/user/bookings/${booking._id}`}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">You have no past bookings.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UserDashboard