// frontend/src/components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Table, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaUsers, FaBed, FaCalendarCheck, FaStar, FaComments, FaChartLine } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'

const AdminDashboard = () => {
  const { stats, loading } = useAdmin()
  const [recentData, setRecentData] = useState({ bookings: [], reviews: [], queries: [] })

  useEffect(() => {
    if (stats && stats.recent) {
      setRecentData(stats.recent)
    }
  }, [stats])

  if (loading) {
    return <div className="text-center py-5">Loading dashboard...</div>
  }

  // Default values to prevent undefined errors
  const counts = stats?.counts || {
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    totalUsers: 0,
    activeUsers: 0,
    pendingQueries: 0
  }

  const revenue = stats?.revenue || {
    totalRevenue: 0
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaBed className="text-primary" size={30} />
              </div>
              <div>
                <h3>{counts.totalRooms}</h3>
                <p className="mb-0">Total Rooms</p>
                <small>{counts.availableRooms} available</small>
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
                <h3>{counts.totalBookings}</h3>
                <p className="mb-0">Total Bookings</p>
                <small>{counts.confirmedBookings} confirmed</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaUsers className="text-info" size={30} />
              </div>
              <div>
                <h3>{counts.totalUsers}</h3>
                <p className="mb-0">Total Users</p>
                <small>{counts.activeUsers} active</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stats-icon me-3">
                <FaChartLine className="text-warning" size={30} />
              </div>
              <div>
                <h3>${revenue.totalRevenue?.toFixed(2) || '0.00'}</h3>
                <p className="mb-0">Total Revenue</p>
                <small>All time</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Bookings */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Bookings</h5>
              <Button as={Link} to="/admin/bookings" variant="outline-primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              {recentData.bookings && recentData.bookings.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Dates</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentData.bookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.user?.name}</td>
                        <td>{booking.room?.name}</td>
                        <td>
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td>
                          <Badge bg={
                            booking.status === 'confirmed' ? 'success' : 
                            booking.status === 'pending' ? 'warning' : 
                            booking.status === 'cancelled' ? 'danger' : 'info'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">No recent bookings</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        {/* Recent Reviews */}
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Reviews</h5>
              <Button as={Link} to="/admin/reviews" variant="outline-primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              {recentData.reviews && recentData.reviews.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Rating</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentData.reviews.map(review => (
                      <tr key={review._id}>
                        <td>{review.user?.name}</td>
                        <td>{review.room?.name}</td>
                        <td>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </td>
                        <td>
                          <Badge bg={
                            review.status === 'approved' ? 'success' : 
                            review.status === 'pending' ? 'warning' : 'danger'
                          }>
                            {review.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">No recent reviews</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Pending Queries */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Pending Queries ({counts.pendingQueries})</h5>
              <Button as={Link} to="/admin/queries" variant="outline-primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              {recentData.queries && recentData.queries.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentData.queries.map(query => (
                      <tr key={query._id}>
                        <td>{query.name}</td>
                        <td>{query.email}</td>
                        <td>{query.subject}</td>
                        <td>{new Date(query.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Button as={Link} to={`/admin/queries/${query._id}`} variant="outline-primary" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">No pending queries</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard