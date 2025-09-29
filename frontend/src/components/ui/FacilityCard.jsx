import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaSwimmingPool, FaWifi, FaUtensils, FaDumbbell, FaParking, FaConciergeBell } from 'react-icons/fa'

const FacilityCard = ({ facility }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'swimming-pool': return <FaSwimmingPool size={40} />
      case 'wifi': return <FaWifi size={40} />
      case 'restaurant': return <FaUtensils size={40} />
      case 'gym': return <FaDumbbell size={40} />
      case 'parking': return <FaParking size={40} />
      case 'concierge': return <FaConciergeBell size={40} />
      default: return <FaConciergeBell size={40} />
    }
  }

  return (
    <Card className="facility-card h-100">
      <Card.Body className="d-flex flex-column align-items-center text-center">
        <div className="facility-icon mb-3">
          {getIcon(facility.icon)}
        </div>
        <Card.Title>{facility.name}</Card.Title>
        <Card.Text>{facility.description}</Card.Text>
        {facility.link && (
          <Button as={Link} to={facility.link} variant="outline-primary" className="mt-auto">
            Learn More
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default FacilityCard