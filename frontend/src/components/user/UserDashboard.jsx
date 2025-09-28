import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserBookings } from '../../services/api';
import { formatDate, formatCurrency } from '../utils/helpers.jsx';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchUserBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const upcomingBookings = bookings.filter(
    booking => new Date(booking.checkIn) > new Date() && booking.status !== 'cancelled'
  );

  const pastBookings = bookings.filter(
    booking => new Date(booking.checkOut) < new Date() || booking.status === 'cancelled'
  );

  return (
    <div className="user-dashboard py-5">
      <Container>
        <h1 className="section-title">My Dashboard</h1>
        
        <Row>
          <Col md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Welcome, {user?.name}</Card.Title>
                <p>{user?.email}</p>
                <Link to="/user/profile" className="btn btn-outline-primary">Edit Profile</Link>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            <Row>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Upcoming Bookings</Card.Title>
                    {loading ? (
                      <div>Loading...</div>
                    ) : upcomingBookings.length === 0 ? (
                      <Alert variant="info">You have no upcoming bookings.</Alert>
                    ) : (
                      <div>
                        {upcomingBookings.slice(0, 3).map(booking => (
                          <div key={booking._id} className="mb-3 p-3 border rounded">
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5>{booking.room?.name}</h5>
                                <p>
                                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                </p>
                              </div>
                              <div className="text-end">
                                <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}>
                                  {booking.status}
                                </span>
                                <p className="mb-0">{formatCurrency(booking.totalPrice)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {upcomingBookings.length > 3 && (
                          <div className="text-center">
                            <Link to="/user/bookings" className="btn btn-sm btn-outline-primary">
                              View All Bookings
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Past Bookings</Card.Title>
                    {loading ? (
                      <div>Loading...</div>
                    ) : pastBookings.length === 0 ? (
                      <Alert variant="info">You have no past bookings.</Alert>
                    ) : (
                      <div>
                        {pastBookings.slice(0, 3).map(booking => (
                          <div key={booking._id} className="mb-3 p-3 border rounded">
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5>{booking.room?.name}</h5>
                                <p>
                                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                </p>
                              </div>
                              <div className="text-end">
                                <span className={`badge ${booking.status === 'cancelled' ? 'bg-danger' : 'bg-success'}`}>
                                  {booking.status}
                                </span>
                                <p className="mb-0">{formatCurrency(booking.totalPrice)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {pastBookings.length > 3 && (
                          <div className="text-center">
                            <Link to="/user/bookings" className="btn btn-sm btn-outline-primary">
                              View All Bookings
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;