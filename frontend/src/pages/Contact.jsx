import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { useRooms } from '../hooks/useRooms'

const Contact = () => {
  const { submitQuery, loading, error, success } = useRooms()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const onSubmit = async (data) => {
    try {
      await submitQuery(data)
      reset()
      setShowSuccess(true)
      setShowError(false)
    } catch (err) {
      setShowError(true)
      setShowSuccess(false)
    }
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Contact Us</h1>
      <p className="text-center mb-5">
        Have questions or need assistance? Our team is here to help make your stay exceptional.
      </p>
      
      <Row>
        <Col md={5} className="mb-4">
          <Card>
            <Card.Body>
              <h4 className="mb-4">Get In Touch</h4>
              
              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <FaMapMarkerAlt className="me-3 mt-1 text-primary" />
                  <div>
                    <h5>Address</h5>
                    <p>123 Paradise Beach, Bali, Indonesia 80361</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FaPhone className="me-3 mt-1 text-primary" />
                  <div>
                    <h5>Phone</h5>
                    <p>+62 123 456 7890</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FaEnvelope className="me-3 mt-1 text-primary" />
                  <div>
                    <h5>Email</h5>
                    <p>info@asianresort.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <FaClock className="me-3 mt-1 text-primary" />
                  <div>
                    <h5>Business Hours</h5>
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h5>How to Reach Us</h5>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0418220506337!2d115.16895831531763!3d-8.670625493745827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd141d3e81034fa%3A0x24910fb14b24b690!2sAyana%20Resort%20and%20Spa%2C%20Bali!5e0!3m2!1sen!2s!4v1653589256391!5m2!1sen!2s" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Resort Location"
                  ></iframe>
                </div>
              </div>
              
              <div>
                <h5>Resort Video</h5>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Resort Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={7}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Send Us a Message</h4>
              
              {showError && error && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  {error}
                </Alert>
              )}
              
              {showSuccess && success && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  {success}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your name"
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters'
                          }
                        })}
                      />
                      {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Enter your email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter subject"
                    {...register('subject', { 
                      required: 'Subject is required'
                    })}
                  />
                  {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Enter your message"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                  />
                  {errors.message && <Form.Text className="text-danger">{errors.message.message}</Form.Text>}
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact