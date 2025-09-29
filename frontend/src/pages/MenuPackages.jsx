import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'

const MenuPackages = () => {
  const { menuItems, loading } = useRooms()
  
  const defaultMenuItems = [
    {
      name: 'Breakfast Buffet',
      description: 'Start your day with our extensive breakfast buffet featuring Asian and international favorites, fresh fruits, pastries, and made-to-order egg stations.',
      price: 25,
      category: 'breakfast',
      image: '/images/breakfast.jpg'
    },
    {
      name: 'Lunch Set Menu',
      description: 'Enjoy a delicious three-course lunch with choices of soup, main course, and dessert. Perfect for a midday break from your activities.',
      price: 35,
      category: 'lunch',
      image: '/images/lunch.jpg'
    },
    {
      name: 'Dinner Experience',
      description: 'Indulge in our signature dinner featuring the finest local ingredients and international cuisine, complemented by our extensive wine selection.',
      price: 65,
      category: 'dinner',
      image: '/images/dinner.jpg'
    },
    {
      name: 'Romantic Dinner Package',
      description: 'A private candlelit dinner on the beach or in our exclusive restaurant, complete with a bottle of champagne and personalized service.',
      price: 150,
      category: 'packages',
      image: '/images/romantic-dinner.jpg'
    },
    {
      name: 'Family Dining Package',
      description: 'A special package for families including a four-course meal, welcome drinks, and a special dessert for children.',
      price: 120,
      category: 'packages',
      image: '/images/family-dining.jpg'
    },
    {
      name: 'BBQ Night',
      description: 'Join us for our weekly BBQ night featuring grilled seafood, meats, and local specialties accompanied by live music and entertainment.',
      price: 45,
      category: 'dinner',
      image: '/images/bbq-night.jpg'
    },
    {
      name: 'Afternoon Tea',
      description: 'Traditional afternoon tea with a selection of fine teas, finger sandwiches, scones, and pastries in our elegant lounge.',
      price: 30,
      category: 'other',
      image: '/images/afternoon-tea.jpg'
    },
    {
      name: 'In-Room Dining',
      description: 'Enjoy our full menu in the comfort of your room. Available 24 hours a day with a diverse selection of dishes and beverages.',
      price: 15,
      category: 'other',
      image: '/images/room-service.jpg'
    }
  ]

  const displayMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems
  
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'packages', name: 'Packages' },
    { id: 'other', name: 'Other' }
  ]
  
  const filteredItems = activeCategory === 'all' 
    ? displayMenuItems 
    : displayMenuItems.filter(item => item.category === activeCategory)

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Menu & Packages</h1>
      <p className="text-center mb-5">
        Discover our exquisite culinary offerings, from authentic Asian cuisine to international favorites, all prepared by our talented chefs.
      </p>
      
      <div className="text-center mb-4">
        {categories.map(category => (
          <Button 
            key={category.id}
            variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          {filteredItems.map(item => (
            <Col key={item._id || item.name} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={item.image} />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{item.name}</Card.Title>
                    <Badge bg="primary">${item.price}</Badge>
                  </div>
                  <Card.Text className="flex-grow-1">{item.description}</Card.Text>
                  <Button variant="primary" className="mt-auto">
                    Add to Reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      <Row className="mt-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Dining Information</h4>
              <Row>
                <Col md={6}>
                  <h5>Restaurant Hours</h5>
                  <ul>
                    <li>Breakfast: 6:30 AM - 10:30 AM</li>
                    <li>Lunch: 12:00 PM - 3:00 PM</li>
                    <li>Dinner: 6:00 PM - 10:30 PM</li>
                    <li>Room Service: 24 hours</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5>Dress Code</h5>
                  <ul>
                    <li>Breakfast & Lunch: Casual</li>
                    <li>Dinner: Smart Casual (no shorts or flip-flops)</li>
                    <li>Special Events: Formal attire may be required</li>
                  </ul>
                </Col>
              </Row>
              
              <Alert variant="info" className="mt-3">
                <h5>Special Dietary Requirements</h5>
                <p>Please inform our staff of any dietary restrictions or allergies when making your reservation. Our chefs are happy to accommodate special dietary needs with advance notice.</p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MenuPackages