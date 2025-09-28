import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchUserBookingById } from '../../services/api';
import { formatDate, formatCurrency, calculateNights } from '../../utils/helpers';

const BookingReceipt = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        const response = await fetchUserBookingById(id);
        setBooking(response.data);
      } catch (error) {
        console.error('Error loading booking:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="text-center py-5">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="text-center py-5">Booking not found</div>;
  }

  const nights = calculateNights(booking.checkIn, booking.checkOut);

  return (
    <div className="booking-receipt py-5">
      <Container>
        <div className="text-center mb-4">
          <h1>Booking Receipt</h1>
          <Button variant="primary" onClick={handlePrint} className="me-2">
            <i className="bi bi-printer me-2"></i>Print Receipt
          </Button>
          <Button as={Link} to="/user/bookings" variant="outline-primary">
            Back to Bookings
          </Button>
        </div>
        
        <Card>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h4>Booking Details</h4>
                <p><strong>Booking ID:</strong> {booking._id}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Room:</strong> {booking.room?.name}</p>
                <p><strong>Check-in:</strong> {formatDate(booking.checkIn)}</p>
                <p><strong>Check-out:</strong> {formatDate(booking.checkOut)}</p>
                <p><strong>Nights:</strong> {nights}</p>
                <p><strong>Guests:</strong> {booking.adults} adults, {booking.children} children</p>
                <p><strong>Payment Method:</strong> {booking.paymentMethod.replace('_', ' ')}</p>
                {booking.specialRequests && (
                  <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                )}
              </Col>
              
              <Col md={6}>
                <h4>Payment Details</h4>
                <p><strong>Price per Night:</strong> {formatCurrency(booking.room?.price)}</p>
                <p><strong>Nights:</strong> {nights}</p>
                <p><strong>Subtotal:</strong> {formatCurrency(booking.room?.price * nights)}</p>
                <p><strong>Tax:</strong> {formatCurrency(0)}</p>
                <hr />
                <p><strong>Total Paid:</strong> {formatCurrency(booking.totalPrice)}</p>
                <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col md={12}>
                <h4>Terms and Conditions</h4>
                <p className="small">
                  This booking is subject to the resort's terms and conditions. 
                  Cancellation policies apply as per the resort's regulations. 
                  Please contact the resort directly for any changes or modifications to your booking.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default BookingReceipt;