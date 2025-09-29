import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Form, Badge, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaStar, FaUsers, FaBed, FaBath, FaWifi, FaParking, FaUtensils, FaSwimmingPool } from 'react-icons/fa'
import ImageSlider from '../components/ui/ImageSlider'
import ReviewCard from '../components/ui/ReviewCard'
import RoomCard from '../components/ui/RoomCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms, useBookings } from '../hooks/useRooms'
import { useAuth } from '../hooks/useAuth'

const RoomDetails = () => {
  const { id } = useParams()
  const { room, loading, error, recommendedRooms } = useRooms(id)
  const { createBooking, bookingLoading, bookingError, bookingSuccess } = useBookings()
  const { user } = useAuth()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')
  
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalNights, setTotalNights] = useState(0)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const startDate = new Date(checkIn)
      const endDate = new Date(checkOut)
      const diffTime = Math.abs(endDate - startDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays > 0) {
        setTotalNights(diffDays)
        setTotalPrice(diffDays * room.pricePerNight)
      } else {
        setTotalNights(0)
        setTotalPrice(0)
      }
    }
  }, [checkIn, checkOut, room])

  useEffect(() => {
    if (bookingError) {
      setShowError(true)
    }
  }, [bookingError])

  useEffect(() => {
    if (bookingSuccess) {
      setShowSuccess(true)
      setShowBookingForm(false)
    }
  }, [bookingSuccess])

  const onSubmitBooking = async (data) => {
    if (!user) {
      setShowError(true)
      return
    }
    
    try {
      await createBooking({
        room: id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adults: parseInt(data.adults),
        children: parseInt(data.children),
        totalPrice,
        specialRequests: data.specialRequests
      })
    } catch (err) {
      setShowError(true)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />)
      } else {
        stars.push(<FaStar key={i} className="text-secondary" />)
      }
    }
    return stars
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      {showError && bookingError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          {bookingError}
        </Alert>
      )}
      
      {showSuccess && bookingSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          {bookingSuccess}
        </Alert>
      )}
      
      <Row>
        <Col md={8}>
          {/* Room Images */}
          <div className="mb-4">
            <ImageSlider images={room.images} height={450} />
          </div>
          
          {/* Room Details */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1>{room.name}</h1>
                  <div className="d-flex align-items-center mb-2">
                    {renderStars(room.rating)}
                    <span className="ms-2">{room.rating} ({room.reviewsCount} reviews)</span>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="text-primary">${room.pricePerNight}</h3>
                  <p className="mb-0">per night</p>
                </div>
              </div>
              
              <p>{room.description}</p>
              
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <FaUsers className="me-2 text-primary" />
                    <div>
                      <h6>Capacity</h6>
                      <p>{room.capacity.adults} Adults, {room.capacity.children} Children</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <FaBed className="me-2 text-primary" />
                    <div>
                      <h6>Bed Type</h6>
                      <p>{room.bedType}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <FaBath className="me-2 text-primary" />
                    <div>
                      <h6>Bathroom</h6>
                      <p>{room.bathroom}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <FaWifi className="me-2 text-primary" />
                    <div>
                      <h6>Internet</h6>
                      <p>{room.internet}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h5>Features</h5>
                <div className="d-flex flex-wrap">
                  {room.features.map((feature, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h5>Facilities</h5>
                <div className="d-flex flex-wrap">
                  {room.facilities.map((facility, index) => (
                    <Badge key={index} bg="primary" className="me-2 mb-2">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
          
          {/* Booking Form */}
          <Card className="mb-4" id="booking">
            <Card.Header>
              <h4 className="mb-0">Book This Room</h4>
            </Card.Header>
            <Card.Body>
              {!user ? (
                <Alert variant="info">
                  Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to book this room.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit(onSubmitBooking)}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="checkIn">
                        <Form.Label>Check-in Date</Form.Label>
                        <Form.Control 
                          type="date" 
                          {...register('checkIn', { required: 'Check-in date is required' })}
                        />
                        {errors.checkIn && <Form.Text className="text-danger">{errors.checkIn.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="checkOut">
                        <Form.Label>Check-out Date</Form.Label>
                        <Form.Control 
                          type="date" 
                          {...register('checkOut', { required: 'Check-out date is required' })}
                        />
                        {errors.checkOut && <Form.Text className="text-danger">{errors.checkOut.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="adults">
                        <Form.Label>Adults</Form.Label>
                        <Form.Select 
                          {...register('adults', { required: 'Number of adults is required' })}
                          defaultValue="1"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </Form.Select>
                        {errors.adults && <Form.Text className="text-danger">{errors.adults.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="children">
                        <Form.Label>Children</Form.Label>
                        <Form.Select 
                          {...register('children')}
                          defaultValue="0"
                        >
                          {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="specialRequests">
                    <Form.Label>Special Requests (Optional)</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Any special requests or requirements..."
                      {...register('specialRequests')}
                    />
                  </Form.Group>
                  
                  {totalNights > 0 && (
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between">
                        <span>Room Price (${room.pricePerNight} × {totalNights} nights):</span>
                        <span>${room.pricePerNight * totalNights}</span>
                      </div>
                      <div className="d-flex justify-content-between fw-bold mt-2">
                        <span>Total Price:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100"
                    disabled={bookingLoading || !room.available}
                  >
                    {bookingLoading ? 'Booking...' : 'Book Now'}
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
          
          {/* Reviews Section */}
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Guest Reviews</h4>
            </Card.Header>
            <Card.Body>
              {room.reviews && room.reviews.length > 0 ? (
                <div>
                  {room.reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p>No reviews yet. Be the first to review this room!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          {/* Booking Summary Card */}
          <Card className="mb-4 sticky-top">
            <Card.Body>
              <h4 className="mb-3">Booking Summary</h4>
              <div className="mb-3">
                <h5>${room.pricePerNight} <span className="text-muted">/ night</span></h5>
                <div className="d-flex align-items-center">
                  {renderStars(room.rating)}
                  <span className="ms-2">{room.rating} ({room.reviewsCount} reviews)</span>
                </div>
              </div>
              
              <div className="mb-3">
                <h6>Capacity</h6>
                <p>{room.capacity.adults} Adults, {room.capacity.children} Children</p>
              </div>
              
              <div className="mb-3">
                <h6>Availability</h6>
                {room.available ? (
                  <Badge bg="success">Available</Badge>
                ) : (
                  <Badge bg="danger">Not Available</Badge>
                )}
              </div>
              
              <Button 
                variant="primary" 
                className="w-100"
                onClick={() => setShowBookingForm(!showBookingForm)}
                disabled={!room.available}
              >
                {room.available ? 'Book Now' : 'Not Available'}
              </Button>
            </Card.Body>
          </Card>
          
          {/* Recommended Rooms */}
          {recommendedRooms.length > 0 && (
            <Card>
              <Card.Header>
                <h4 className="mb-0">Recommended Rooms</h4>
              </Card.Header>
              <Card.Body>
                {recommendedRooms.map(recRoom => (
                  <div key={recRoom._id} className="mb-3">
                    <RoomCard room={recRoom} />
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default RoomDetails