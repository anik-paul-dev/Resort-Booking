import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { fetchUserBookings, cancelBooking } from '../../services/api';
import { formatDate, formatCurrency } from '../../utils/helpers';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchUserBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        setSuccess('Booking cancelled successfully.');
        // Refresh bookings
        const response = await fetchUserBookings();
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to cancel booking.');
      }
    }
  };

  const isUpcoming = (checkIn) => {
    return new Date(checkIn) > new Date();
  };

  const isCancellable = (checkIn, status) => {
    if (status === 'cancelled') return false;
    const checkInDate = new Date(checkIn);
    const now = new Date();
    const timeDiff = checkInDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff > 24;
  };

  return (
    <div className="user-bookings py-5">
      <Container>
        <h1 className="section-title">My Bookings</h1>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        {loading ? (
          <div className="text-center py-5">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-5">
            <h4>You have no bookings yet.</h4>
            <Link to="/rooms" className="btn btn-primary">Browse Rooms</Link>
          </div>
        ) : (
          <Row>
            {bookings.map(booking => (
              <Col key={booking._id} md={12} className="mb-4">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title as="h4">{booking.room?.name}</Card.Title>
                        <Card.Text>
                          <p>
                            <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                          </p>
                          <p>
                            <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                          </p>
                          <p>
                            <strong>Guests:</strong> {booking.adults} adults, {booking.children} children
                          </p>
                          <p>
                            <strong>Payment Method:</strong> {booking.paymentMethod.replace('_', ' ')}
                          </p>
                          {booking.specialRequests && (
                            <p>
                              <strong>Special Requests:</strong> {booking.specialRequests}
                            </p>
                          )}
                        </Card.Text>
                      </Col>
                      <Col md={4} className="text-end">
                        <div className="mb-3">
                          <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : booking.status === 'cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <strong>Total:</strong> {formatCurrency(booking.totalPrice)}
                        </div>
                        <div className="d-grid gap-2">
                          <Button 
                            as={Link} 
                            to={`/user/bookings/${booking._id}/receipt`} 
                            variant="outline-primary"
                            size="sm"
                          >
                            View Receipt
                          </Button>
                          {isUpcoming(booking.checkIn) && isCancellable(booking.checkIn, booking.status) && (
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default UserBookings;