import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaSwimmingPool, FaUtensils, FaSpa, FaWifi, FaParking, FaConciergeBell } from 'react-icons/fa'

const About = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">About Asian Resort</h1>
      <p className="text-center mb-5">
        Discover the perfect blend of luxury, comfort, and Asian hospitality at our exquisite resort.
      </p>
      
      <Row className="mb-5">
        <Col md={6}>
          <img 
            src="/images/resort-overview.jpg" 
            alt="Asian Resort Overview" 
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Our Story</h2>
          <p>
            Nestled in the heart of Asia's most breathtaking landscapes, Asian Resort offers an unparalleled luxury experience that combines traditional Asian hospitality with modern comforts. Our resort is designed to provide a sanctuary of tranquility where guests can immerse themselves in the natural beauty and rich cultural heritage of the region.
          </p>
          <p>
            Founded in 2010, Asian Resort has quickly become one of the premier destinations for travelers seeking an authentic Asian luxury experience. Our commitment to excellence in service, sustainability, and guest satisfaction has earned us numerous accolades and the loyalty of guests from around the world.
          </p>
          <p>
            At Asian Resort, we believe that true luxury lies in the details. From our thoughtfully designed rooms and suites to our world-class amenities and personalized service, every aspect of your stay is crafted to exceed your expectations.
          </p>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="text-center mb-4">Our Vision & Mission</h2>
          <Row>
            <Col md={6}>
              <Card className="h-100">
                <Card.Body>
                  <h3 className="text-primary">Our Vision</h3>
                  <p>
                    To be the leading luxury resort in Asia, renowned for our exceptional service, commitment to sustainability, and ability to create unforgettable experiences that celebrate the rich cultural heritage of the region.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100">
                <Card.Body>
                  <h3 className="text-primary">Our Mission</h3>
                  <p>
                    To provide our guests with an extraordinary luxury experience that combines authentic Asian hospitality with world-class amenities, while promoting sustainable tourism practices and supporting local communities.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="text-center mb-4">Our Values</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaSwimmingPool size={40} className="text-primary" />
                  </div>
                  <h4>Excellence</h4>
                  <p>We strive for excellence in everything we do, from the quality of our accommodations to the level of service we provide.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaUtensils size={40} className="text-primary" />
                  </div>
                  <h4>Authenticity</h4>
                  <p>We celebrate and preserve the rich cultural heritage of Asia through our design, cuisine, and experiences.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaSpa size={40} className="text-primary" />
                  </div>
                  <h4>Sustainability</h4>
                  <p>We are committed to environmentally responsible practices that protect our natural surroundings and support local communities.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaWifi size={40} className="text-primary" />
                  </div>
                  <h4>Innovation</h4>
                  <p>We continuously seek new ways to enhance the guest experience through innovative services and amenities.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaParking size={40} className="text-primary" />
                  </div>
                  <h4>Integrity</h4>
                  <p>We conduct our business with honesty, transparency, and respect for our guests, employees, and partners.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div className="mb-3">
                    <FaConciergeBell size={40} className="text-primary" />
                  </div>
                  <h4>Service</h4>
                  <p>We are dedicated to providing personalized, attentive service that anticipates and exceeds our guests' needs.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="text-center mb-4">Our Team</h2>
          <p className="text-center mb-4">
            Our dedicated team of professionals is committed to making your stay unforgettable. From our management team to our front-line staff, every member of the Asian Resort family shares a passion for hospitality and a commitment to excellence.
          </p>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="text-center">
                <Card.Img variant="top" src="/images/team-1.jpg" />
                <Card.Body>
                  <h5>John Smith</h5>
                  <p className="text-muted">General Manager</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="text-center">
                <Card.Img variant="top" src="/images/team-2.jpg" />
                <Card.Body>
                  <h5>Sarah Johnson</h5>
                  <p className="text-muted">Executive Chef</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="text-center">
                <Card.Img variant="top" src="/images/team-3.jpg" />
                <Card.Body>
                  <h5>Michael Chen</h5>
                  <p className="text-muted">Spa Director</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="text-center">
                <Card.Img variant="top" src="/images/team-4.jpg" />
                <Card.Body>
                  <h5>Lisa Wong</h5>
                  <p className="text-muted">Guest Relations Manager</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row>
        <Col md={12} className="text-center">
          <h2 className="mb-4">Experience Asian Resort</h2>
          <p className="mb-4">
            Whether you're seeking relaxation, adventure, or cultural exploration, Asian Resort offers the perfect setting for an unforgettable vacation. Book your stay today and discover the magic of Asian hospitality.
          </p>
          <Button as={Link} to="/rooms" variant="primary" size="lg">
            Book Your Stay
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default About