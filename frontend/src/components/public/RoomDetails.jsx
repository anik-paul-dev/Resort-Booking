import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card, Alert, Modal } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { useCustomAuth } from '../hooks/useAuth';
import { fetchRoomById, fetchRecommendedRooms, checkRoomAvailability, createBooking } from '../../services/api';
import { generateStars, formatCurrency, formatDate, calculateNights, calculateTotalPrice } from '../../utils/helpers';
import RoomCard from '../ui/RoomCard';
import ReviewSlider from '../ui/ReviewSlider';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [room, setRoom] = useState(null);
  const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    paymentMethod: 'credit_card',
    specialRequests: '',
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const response = await fetchRoomById(id);
        setRoom(response.data);
        
        // Load recommended rooms
        const recommendedResponse = await fetchRecommendedRooms(id, 3);
        setRecommendedRooms(recommendedResponse.data);
      } catch (error) {
        console.error('Error loading room:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  useEffect(() => {
    if (bookingForm.checkIn && bookingForm.checkOut) {
      const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
      const price = calculateTotalPrice(room?.price || 0, nights);
      setTotalPrice(price);
    }
  }, [bookingForm, room]);

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkAvailabilityHandler = async () => {
    try {
      const response = await checkRoomAvailability(id, bookingForm.checkIn, bookingForm.checkOut);
      setAvailability(response.data.available);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailability(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setBookingError('');
      const bookingData = {
        room: id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        adults: parseInt(bookingForm.adults),
        children: parseInt(bookingForm.children),
        paymentMethod: bookingForm.paymentMethod,
        specialRequests: bookingForm.specialRequests,
      };

      await createBooking(bookingData);
      setBookingSuccess(true);
      setShowBookingModal(false);
      // Reset form
      setBookingForm({
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        paymentMethod: 'credit_card',
        specialRequests: '',
      });
    } catch (error) {
      setBookingError(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const openBookingModal = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  if (loading) {
    return <div className="text-center py-5">Loading room details...</div>;
  }

  if (!room) {
    return <div className="text-center py-5">Room not found</div>;
  }

  return (
    <div className="room-details py-5">
      <Container>
        <Row>
          <Col md={8}>
            <h1>{room.name}</h1>
            
            {room.images && room.images.length > 0 && (
              <Carousel className="mb-4">
                {room.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            
            <div className="room-info mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="room-price">
                  <span className="fs-3">{formatCurrency(room.price)}</span> <span className="text-muted">/ night</span>
                </div>
                <div className="room-rating">
                  {generateStars(room.averageRating || 0)}
                  <span className="ms-2">({room.reviews?.length || 0} reviews)</span>
                </div>
              </div>
              
              <div className="room-capacity mb-3">
                <i className="bi bi-people me-2"></i> {room.capacity.adults} adults, {room.capacity.children} children
              </div>
              
              {room.size && (
                <div className="room-size mb-3">
                  <i className="bi bi-rulers me-2"></i> {room.size}
                </div>
              )}
              
              {room.bedType && (
                <div className="room-bed mb-3">
                  <i className="bi bi-house-door me-2"></i> {room.bedType}
                </div>
              )}
              
              {room.view && (
                <div className="room-view mb-3">
                  <i className="bi bi-eye me-2"></i> {room.view}
                </div>
              )}
            </div>
            
            <div className="room-description mb-4">
              <h3>Description</h3>
              <p>{room.description}</p>
            </div>
            
            {room.features && room.features.length > 0 && (
              <div className="room-features mb-4">
                <h3>Features</h3>
                <div className="d-flex flex-wrap">
                  {room.features.map(feature => (
                    <span key={feature._id} className="badge bg-light text-dark me-2 mb-2">
                      {feature.icon && <i className={`bi ${feature.icon} me-1`}></i>}
                      {feature.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {room.facilities && room.facilities.length > 0 && (
              <div className="room-facilities mb-4">
                <h3>Facilities</h3>
                <div className="d-flex flex-wrap">
                  {room.facilities.map(facility => (
                    <span key={facility._id} className="badge bg-light text-dark me-2 mb-2">
                      {facility.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="room-reviews mb-4">
              <h3>Reviews</h3>
              {room.reviews && room.reviews.length > 0 ? (
                <ReviewSlider reviews={room.reviews} />
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            
            {recommendedRooms.length > 0 && (
              <div className="recommended-rooms mb-4">
                <h3>Recommended Rooms</h3>
                <Row>
                  {recommendedRooms.map(room => (
                    <Col key={room._id} md={6} lg={4} className="mb-4">
                      <RoomCard room={room} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
          
          <Col md={4}>
            <Card className="booking-card sticky-top" style={{ top: '100px' }}>
              <Card.Body>
                <Card.Title as="h3">Book This Room</Card.Title>
                
                {bookingSuccess && (
                  <Alert variant="success">
                    Your booking has been confirmed! Check your email for details.
                  </Alert>
                )}
                
                {bookingError && (
                  <Alert variant="danger">
                    {bookingError}
                  </Alert>
                )}
                
                <Form onSubmit={handleBookingSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkIn"
                      value={bookingForm.checkIn}
                      onChange={handleBookingFormChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkOut"
                      value={bookingForm.checkOut}
                      onChange={handleBookingFormChange}
                      min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Adults</Form.Label>
                    <Form.Select
                      name="adults"
                      value={bookingForm.adults}
                      onChange={handleBookingFormChange}
                      required
                    >
                      {[...Array(room.capacity.adults)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Children</Form.Label>
                    <Form.Select
                      name="children"
                      value={bookingForm.children}
                      onChange={handleBookingFormChange}
                    >
                      {[...Array(room.capacity.children + 1)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      value={bookingForm.paymentMethod}
                      onChange={handleBookingFormChange}
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Special Requests</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={handleBookingFormChange}
                      rows={3}
                    />
                  </Form.Group>
                  
                  <div className="price-summary mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between">
                      <span>Price per night:</span>
                      <span>{formatCurrency(room.price)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Nights:</span>
                      <span>{calculateNights(bookingForm.checkIn, bookingForm.checkOut)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100"
                    disabled={!availability}
                  >
                    Book Now
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RoomDetails;