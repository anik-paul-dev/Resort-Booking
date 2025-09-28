import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import { fetchRooms } from '../../services/api';
import Calendar from '../ui/Calendar';

const RoomAvailability = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const response = await fetchRooms({ isActive: true });
        setRooms(response.data.rooms);
        if (response.data.rooms.length > 0) {
          setSelectedRoom(response.data.rooms[0]._id);
        }
      } catch (error) {
        console.error('Error loading rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (loading) {
    return <div className="text-center py-5">Loading rooms...</div>;
  }

  return (
    <div className="room-availability py-5">
      <Container>
        <h1 className="section-title">Room Availability</h1>
        
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Select Room</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Room</Form.Label>
                  <Form.Select value={selectedRoom} onChange={handleRoomChange}>
                    {rooms.map(room => (
                      <option key={room._id} value={room._id}>{room.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  Green dates are available, red dates are booked.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Availability Calendar</Card.Title>
                {selectedRoom ? (
                  <Calendar 
                    roomId={selectedRoom} 
                    onDateSelect={handleDateSelect}
                  />
                ) : (
                  <div className="text-center py-5">
                    <p>Please select a room to view availability</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RoomAvailability;