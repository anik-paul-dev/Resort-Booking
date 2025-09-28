import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { generateStars, formatCurrency } from '../../utils/helpers';

const RoomCard = ({ room }) => {
  return (
    <Card className="room-card h-100">
      <Card.Img variant="top" src={room.images[0]} alt={room.name} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>
          <div className="room-price">{formatCurrency(room.price)} <small>/ night</small></div>
          <div className="room-rating mb-2">
            {generateStars(room.averageRating || 0)}
            <span className="ms-2">({room.reviews?.length || 0} reviews)</span>
          </div>
          <div className="room-capacity mb-2">
            <i className="bi bi-people me-1"></i> {room.capacity.adults} adults, {room.capacity.children} children
          </div>
          <div className="room-features mb-3">
            {room.features?.slice(0, 3).map(feature => (
              <span key={feature._id} className="badge bg-light text-dark me-1">
                {feature.name}
              </span>
            ))}
            {room.features?.length > 3 && (
              <span className="badge bg-light text-dark">+{room.features.length - 3} more</span>
            )}
          </div>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button as={Link} to={`/rooms/${room._id}`} variant="outline-primary">Details</Button>
          <Button variant="primary" disabled={!room.isActive}>Book Now</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;