import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaStar, FaUsers, FaBed, FaBath } from 'react-icons/fa'
import ImageSlider from './ImageSlider'

const RoomCard = ({ room }) => {
  return (
    <Card className="room-card h-100">
      <div className="position-relative">
        <ImageSlider images={room.images} height={220} />
        {!room.available && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
            <Badge bg="danger" className="fs-6">Not Available</Badge>
          </div>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{room.name}</Card.Title>
        <div className="mb-2">
          <FaStar className="text-warning me-1" />
          <span>{room.rating}</span>
          <span className="text-muted ms-1">({room.reviewsCount} reviews)</span>
        </div>
        <div className="mb-3">
          <div className="d-flex align-items-center mb-1">
            <FaUsers className="me-2" />
            <span>{room.capacity.adults} Adults, {room.capacity.children} Children</span>
          </div>
          <div className="d-flex align-items-center">
            <FaBed className="me-2" />
            <span>{room.bedType}</span>
          </div>
        </div>
        <div className="mb-3">
          {room.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
              {feature}
            </Badge>
          ))}
          {room.features.length > 3 && (
            <Badge bg="light" text="dark" className="mb-1">
              +{room.features.length - 3} more
            </Badge>
          )}
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="price">${room.pricePerNight}</span>
              <span className="text-muted"> /night</span>
            </div>
            <div>
              <Button 
                as={Link} 
                to={`/room/${room._id}`} 
                variant="outline-primary" 
                size="sm"
                className="me-2"
              >
                Details
              </Button>
              <Button 
                as={Link} 
                to={`/room/${room._id}#booking`} 
                variant="primary" 
                size="sm"
                disabled={!room.available}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default RoomCard