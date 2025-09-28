import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Card, Alert, Button } from 'react-bootstrap';
import { authAPI } from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card>
              <Card.Body>
                <Card.Title as="h3" className="text-center mb-4">Forgot Password</Card.Title>
                
                {success ? (
                  <div>
                    <Alert variant="success">
                      Password reset email sent! Please check your inbox.
                    </Alert>
                    <div className="text-center">
                      <Button as={Link} to="/login" variant="primary">
                        Back to Login
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {error && (
                      <Alert variant="danger">
                        {error}
                      </Alert>
                    )}
                    
                    <p className="text-center mb-4">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                    
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                      </div>
                    </Form>
                    
                    <div className="text-center mt-3">
                      <p>
                        Remember your password? <Link to="/login">Login here</Link>
                      </p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;