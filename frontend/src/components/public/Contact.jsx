import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import { useApp } from '../../context/AppContext';
import { createQuery } from '../../services/api';
import Map from '../ui/Map';
import VideoPlayer from '../ui/VideoPlayer';

const Contact = () => {
  const { settings } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resortLocation = { lat: 20.5937, lng: 78.9629 }; // Default to India's coordinates

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);
    setLoading(true);

    try {
      await createQuery(formData);
      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact py-5">
      <Container>
        <h1 className="section-title">Contact Us</h1>
        
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title as="h3">Send Us a Message</Card.Title>
                
                {formSuccess && (
                  <Alert variant="success">
                    Your message has been sent successfully! We'll get back to you soon.
                  </Alert>
                )}
                
                {formError && (
                  <Alert variant="danger">
                    {formError}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title as="h3">Contact Information</Card.Title>
                
                {settings?.contactAddress && (
                  <div className="mb-3">
                    <h5>Address</h5>
                    <p>{settings.contactAddress}</p>
                  </div>
                )}
                
                {settings?.contactPhone && (
                  <div className="mb-3">
                    <h5>Phone</h5>
                    <p>{settings.contactPhone}</p>
                  </div>
                )}
                
                {settings?.contactEmail && (
                  <div className="mb-3">
                    <h5>Email</h5>
                    <p>{settings.contactEmail}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title as="h3">Our Location</Card.Title>
                <Map location={resortLocation} />
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title as="h3">Resort Video Tour</Card.Title>
                <VideoPlayer 
                  videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Resort Video Tour" 
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;