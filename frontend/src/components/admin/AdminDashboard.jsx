import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchAdminDashboard } from '../../services/api';
import { formatDate, formatCurrency, generateStars } from '../utils/helpers.jsx';
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await fetchAdminDashboard();
        setStats(response.data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="stat-value">{stats?.users?.total || 0}</Card.Text>
              <Card.Text>
                Active: {stats?.users?.active || 0} | 
                Verified: {stats?.users?.verified || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Rooms</Card.Title>
              <Card.Text className="stat-value">{stats?.rooms?.total || 0}</Card.Text>
              <Card.Text>
                Active: {stats?.rooms?.active || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text className="stat-value">{stats?.bookings?.total || 0}</Card.Text>
              <Card.Text>
                Confirmed: {stats?.bookings?.confirmed || 0} | 
                Pending: {stats?.bookings?.pending || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Reviews</Card.Title>
              <Card.Text className="stat-value">{stats?.reviews?.total || 0}</Card.Text>
              <Card.Text>
                Pending: {stats?.reviews?.pending || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Bookings</Card.Title>
              {stats?.recentBookings?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Room</th>
                        <th>User</th>
                        <th>Dates</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentBookings.map(booking => (
                        <tr key={booking._id}>
                          <td>{booking._id.substring(0, 8)}</td>
                          <td>{booking.room?.name}</td>
                          <td>{booking.user?.name}</td>
                          <td>
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </td>
                          <td>
                            <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : booking.status === 'cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No recent bookings</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Queries</Card.Title>
              {stats?.recentQueries?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentQueries.map(query => (
                        <tr key={query._id}>
                          <td>{query.name}</td>
                          <td>{query.email}</td>
                          <td>{query.subject}</td>
                          <td>
                            <span className={`badge ${query.status === 'read' ? 'bg-success' : query.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                              {query.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No recent queries</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Reviews</Card.Title>
              {stats?.recentReviews?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Room</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentReviews.map(review => (
                        <tr key={review._id}>
                          <td>{review.user?.name}</td>
                          <td>{review.room?.name}</td>
                          <td>
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </td>
                          <td>{review.comment.substring(0, 50)}...</td>
                          <td>
                            <span className={`badge ${review.status === 'approved' ? 'bg-success' : review.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                              {review.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No recent reviews</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;