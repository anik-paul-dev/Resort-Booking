import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'

const Features = () => {
  const { features, loading } = useRooms()
  
  const defaultFeatures = [
    {
      name: 'Ocean View',
      description: 'Wake up to breathtaking views of the ocean from your private balcony. Our ocean view rooms offer panoramic vistas of the sparkling sea.',
      icon: 'ocean',
      image: '/images/ocean-view.jpg'
    },
    {
      name: 'Private Balcony',
      description: 'Each room features a private balcony where you can enjoy your morning coffee or evening cocktail while taking in the stunning surroundings.',
      icon: 'balcony',
      image: '/images/balcony.jpg'
    },
    {
      name: 'Luxury Bath',
      description: 'Indulge in our spacious marble bathrooms with deep soaking tubs, separate rain showers, and premium bath amenities.',
      icon: 'bath',
      image: '/images/luxury-bath.jpg'
    },
    {
      name: 'King Size Bed',
      description: 'Experience ultimate comfort on our premium king-size beds with plush pillows and high-thread-count linens for a perfect night\'s sleep.',
      icon: 'bed',
      image: '/images/king-bed.jpg'
    },
    {
      name: 'Mini Bar',
      description: 'Enjoy complimentary beverages and snacks from your well-stocked mini bar, refreshed daily with a selection of local and international favorites.',
      icon: 'mini-bar',
      image: '/images/mini-bar.jpg'
    },
    {
      name: 'Smart TV',
      description: 'Stay entertained with our large-screen smart TVs offering international channels, streaming services, and complimentary high-speed Wi-Fi.',
      icon: 'tv',
      image: '/images/smart-tv.jpg'
    },
    {
      name: 'Air Conditioning',
      description: 'Individual climate control in every room ensures your comfort regardless of the weather outside. Our advanced AC system is quiet and efficient.',
      icon: 'ac',
      image: '/images/ac.jpg'
    },
    {
      name: 'In-Room Safe',
      description: 'Keep your valuables secure with the in-room electronic safe, large enough to accommodate laptops, cameras, and other important items.',
      icon: 'safe',
      image: '/images/safe.jpg'
    }
  ]

  const displayFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Room Features</h1>
      <p className="text-center mb-5">
        Our rooms are thoughtfully designed with premium features and amenities to ensure your comfort and satisfaction throughout your stay.
      </p>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          {displayFeatures.map(feature => (
            <Col key={feature._id || feature.name} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={feature.image || `/images/${feature.icon}.jpg`} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{feature.name}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Features