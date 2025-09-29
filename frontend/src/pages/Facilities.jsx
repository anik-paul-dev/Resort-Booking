import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import FacilityCard from '../components/ui/FacilityCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'

const Facilities = () => {
  const { facilities, loading } = useRooms()
  
  const defaultFacilities = [
    {
      name: 'Swimming Pool',
      description: 'Our infinity pool offers breathtaking views of the ocean and is the perfect place to relax and unwind. Enjoy a refreshing swim or simply soak up the sun on our comfortable loungers.',
      icon: 'swimming-pool',
      image: '/images/swimming-pool.jpg'
    },
    {
      name: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind at our luxurious spa. Choose from a wide range of treatments including massages, facials, and body wraps performed by our expert therapists.',
      icon: 'concierge',
      image: '/images/spa.jpg'
    },
    {
      name: 'Fitness Center',
      description: 'Stay active during your stay at our state-of-the-art fitness center. Equipped with the latest exercise machines and free weights, it\'s perfect for all your workout needs.',
      icon: 'gym',
      image: '/images/fitness.jpg'
    },
    {
      name: 'Restaurants & Bars',
      description: 'Savor exquisite cuisine at our multiple dining venues. From authentic Asian dishes to international favorites, our talented chefs create culinary masterpieces using the freshest ingredients.',
      icon: 'restaurant',
      image: '/images/restaurant.jpg'
    },
    {
      name: 'Kids Club',
      description: 'Our supervised Kids Club offers a range of fun activities for children aged 4-12. Parents can relax knowing their little ones are having a great time in a safe environment.',
      icon: 'concierge',
      image: '/images/kids-club.jpg'
    },
    {
      name: 'Business Center',
      description: 'Stay connected with our fully equipped business center. Featuring high-speed internet, printing facilities, and private meeting rooms for your business needs.',
      icon: 'wifi',
      image: '/images/business-center.jpg'
    },
    {
      name: 'Concierge Services',
      description: 'Our dedicated concierge team is available 24/7 to assist with any requests, from restaurant reservations and tour bookings to transportation arrangements and special celebrations.',
      icon: 'concierge',
      image: '/images/concierge.jpg'
    },
    {
      name: 'Parking',
      description: 'Complimentary valet parking is available for all guests. Our secure parking facility ensures your vehicle is safe while you enjoy your stay with us.',
      icon: 'parking',
      image: '/images/parking.jpg'
    }
  ]

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Our Facilities</h1>
      <p className="text-center mb-5">
        Discover the wide range of facilities and services available at Asian Resort, designed to make your stay unforgettable.
      </p>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          {displayFacilities.map(facility => (
            <Col key={facility._id || facility.name} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={facility.image || `/images/${facility.icon}.jpg`} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{facility.name}</Card.Title>
                  <Card.Text>{facility.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Facilities