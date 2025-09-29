import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>Asian Resort</h5>
            <p>Experience the luxury and tranquility of our resort, nestled in the heart of Asia's most beautiful landscapes.</p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-white"><FaYoutube size={20} /></a>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0 px-0">
                <Link to="/" className="text-white">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-0">
                <Link to="/rooms" className="text-white">Rooms</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-0">
                <Link to="/facilities" className="text-white">Facilities</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-0">
                <Link to="/menu" className="text-white">Menu & Packages</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-0">
                <Link to="/contact" className="text-white">Contact Us</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact Info</h5>
            <p><FaMapMarkerAlt className="me-2" />123 Paradise Beach, Bali, Indonesia</p>
            <p><FaPhone className="me-2" />+62 123 456 7890</p>
            <p><FaEnvelope className="me-2" />info@asianresort.com</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Asian Resort. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer