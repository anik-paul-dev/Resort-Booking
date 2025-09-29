import React, { useState } from 'react'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaKey } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { forgotPassword, error, loading, success } = useAuth()
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email)
      setShowSuccess(true)
      setShowError(false)
    } catch (err) {
      setShowError(true)
      setShowSuccess(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                <FaKey className="me-2" /> Forgot Password
              </h2>
              
              {showSuccess && success && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  {success}
                </Alert>
              )}
              
              {showError && error && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
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
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Reset Password'}
                </Button>
                
                <div className="text-center">
                  <p>
                    Remember your password? <Link to="/login">Login</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword