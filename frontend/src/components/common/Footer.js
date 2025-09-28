import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useApp } from '../../context/AppContext';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { settings } = useApp();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>About Us</h5>
            <p>
              {settings?.siteName || 'Resort Booking'} is a premier resort destination in Asia, 
              offering luxurious accommodations and world-class amenities for an unforgettable vacation experience.
            </p>
            <div className="social-links">
              {settings?.socialMedia?.facebook && (
                <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="me-3">
                  <FaFacebook />
                </a>
              )}
              {settings?.socialMedia?.twitter && (
                <a href={settings.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="me-3">
                  <FaTwitter />
                </a>
              )}
              {settings?.socialMedia?.instagram && (
                <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="me-3">
                  <FaInstagram />
                </a>
              )}
              {settings?.socialMedia?.youtube && (
                <a href={settings.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/room-availability">Availability</Link></li>
              <li><Link to="/menu-packages">Menu & Packages</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <div className="contact-info">
              {settings?.contactAddress && (
                <p><FaMapMarkerAlt className="me-2" /> {settings.contactAddress}</p>
              )}
              {settings?.contactPhone && (
                <p><FaPhone className="me-2" /> {settings.contactPhone}</p>
              )}
              {settings?.contactEmail && (
                <p><FaEnvelope className="me-2" /> {settings.contactEmail}</p>
              )}
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} {settings?.siteName || 'Resort Booking'}. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;