import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FacilityCard = ({ facility }) => {
  return (
    <Card className="facility-card h-100">
      <Card.Img variant="top" src={facility.image} alt={facility.name} />
      <Card.Body>
        <Card.Title>{facility.name}</Card.Title>
        <Card.Text>{facility.description}</Card.Text>
        {facility.openingHours && (
          <Card.Text>
            <small className="text-muted">
              <i className="bi bi-clock me-1"></i> {facility.openingHours}
            </small>
          </Card.Text>
        )}
        <Button as={Link} to={`/facilities/${facility._id}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FacilityCard;