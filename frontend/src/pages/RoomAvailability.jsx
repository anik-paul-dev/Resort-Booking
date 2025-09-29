import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import Calendar from '../components/ui/Calendar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'

const RoomAvailability = () => {
  const { rooms, bookings, loading } = useRooms()
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Room Availability</h1>
      <p className="text-center mb-5">
        Check the availability of our rooms using the calendar below. Green dates have high availability, yellow dates have limited availability, and red dates are fully booked.
      </p>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Calendar bookings={bookings} rooms={rooms} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">How to Book</h4>
              <ol>
                <li>Check the calendar above to see which dates have availability.</li>
                <li>Green dates indicate high availability with many rooms open.</li>
                <li>Yellow dates indicate limited availability with fewer rooms available.</li>
                <li>Red dates indicate that all rooms are fully booked.</li>
                <li>Once you've found a suitable date, visit our <a href="/rooms">Rooms page</a> to view available rooms and make a reservation.</li>
                <li>You can also contact our reservation team directly at +62 123 456 7890 for assistance with booking.</li>
              </ol>
              
              <Alert variant="info" className="mt-4">
                <h5>Important Information</h5>
                <ul>
                  <li>All room rates are subject to availability and may change without prior notice.</li>
                  <li>Bookings are only confirmed once payment has been received.</li>
                  <li>Cancellation policies apply to all bookings. Please review our terms and conditions before booking.</li>
                  <li>For bookings of 5 or more rooms, please contact our group reservations department for special rates.</li>
                </ul>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default RoomAvailability