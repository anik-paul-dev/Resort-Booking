import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Carousel from '../components/ui/Carousel'
import RoomCard from '../components/ui/RoomCard'
import FacilityCard from '../components/ui/FacilityCard'
import ReviewCard from '../components/ui/ReviewCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'
import { FaSwimmingPool, FaWifi, FaUtensils, FaDumbbell, FaParking, FaConciergeBell } from 'react-icons/fa'

const Home = () => {
  const { featuredRooms, facilities, reviews, loading, carousels } = useRooms()
  
  const carouselItems = carousels.length > 0 ? carousels : [
    {
      image: '/images/carousel-1.jpg',
      title: 'Experience Luxury in Asia',
      description: 'Discover our exclusive resort nestled in the heart of Asia\'s most beautiful landscapes.',
      link: '/rooms',
      buttonText: 'Explore Rooms'
    },
    {
      image: '/images/carousel-2.jpg',
      title: 'Unforgettable Experiences',
      description: 'Create memories that will last a lifetime with our world-class amenities and services.',
      link: '/facilities',
      buttonText: 'View Facilities'
    },
    {
      image: '/images/carousel-3.jpg',
      title: 'Culinary Delights',
      description: 'Savor the flavors of Asia with our exquisite dining options and culinary experiences.',
      link: '/menu',
      buttonText: 'View Menu'
    }
  ]

  const defaultFacilities = [
    {
      name: 'Swimming Pool',
      description: 'Infinity pool with stunning ocean views',
      icon: 'swimming-pool',
      link: '/facilities'
    },
    {
      name: 'Free WiFi',
      description: 'High-speed internet access throughout the resort',
      icon: 'wifi',
      link: '/facilities'
    },
    {
      name: 'Restaurant',
      description: 'Fine dining with authentic Asian cuisine',
      icon: 'restaurant',
      link: '/menu'
    },
    {
      name: 'Fitness Center',
      description: 'State-of-the-art gym equipment',
      icon: 'gym',
      link: '/facilities'
    },
    {
      name: 'Parking',
      description: 'Complimentary valet parking service',
      icon: 'parking',
      link: '/facilities'
    },
    {
      name: 'Concierge',
      description: '24/7 concierge service for all your needs',
      icon: 'concierge',
      link: '/contact'
    }
  ]

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities

  return (
    <div>
      <Carousel items={carouselItems} />
      
      <Container className="py-5">
        {/* Featured Rooms Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Featured Rooms</h2>
            <Button as={Link} to="/rooms" variant="outline-primary">
              View All Rooms
            </Button>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row>
              {featuredRooms.map(room => (
                <Col key={room._id} md={4} className="mb-4">
                  <RoomCard room={room} />
                </Col>
              ))}
            </Row>
          )}
        </section>
        
        {/* Facilities Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Our Facilities</h2>
            <Button as={Link} to="/facilities" variant="outline-primary">
              View All Facilities
            </Button>
          </div>
          
          <Row>
            {displayFacilities.slice(0, 6).map(facility => (
              <Col key={facility._id || facility.name} md={4} className="mb-4">
                <FacilityCard facility={facility} />
              </Col>
            ))}
          </Row>
        </section>
        
        {/* Testimonials Section */}
        <section className="mb-5">
          <h2 className="section-title mb-4">What Our Guests Say</h2>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row>
              {reviews.slice(0, 3).map(review => (
                <Col key={review._id} md={4} className="mb-4">
                  <ReviewCard review={review} />
                </Col>
              ))}
            </Row>
          )}
          
          <div className="text-center mt-4">
            <Button as={Link} to="/reviews" variant="primary">
              Read More Reviews
            </Button>
          </div>
        </section>
        
        {/* About Section */}
        <section className="mb-5">
          <Row>
            <Col md={6}>
              <h2 className="section-title text-start">About Asian Resort</h2>
              <p>
                Nestled in the heart of Asia's most breathtaking landscapes, Asian Resort offers an unparalleled luxury experience that combines traditional Asian hospitality with modern comforts. Our resort is designed to provide a sanctuary of tranquility where guests can immerse themselves in the natural beauty and rich cultural heritage of the region.
              </p>
              <p>
                With world-class amenities, exquisite dining options, and personalized service, we strive to create unforgettable memories for each of our guests. Whether you're seeking relaxation, adventure, or cultural exploration, Asian Resort is the perfect destination for your next getaway.
              </p>
              <Button as={Link} to="/about" variant="primary">
                Learn More About Us
              </Button>
            </Col>
            <Col md={6}>
              <img 
                src="/images/resort-overview.jpg" 
                alt="Asian Resort Overview" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  )
}

export default Home