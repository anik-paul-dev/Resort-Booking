import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { authAPI } from '../../services/auth';

const VerifyEmail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(id);
        setStatus('success');
        setMessage(response.message || 'Your email has been verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [id]);

  return (
    <div className="verify-email py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title as="h3" className="mb-4">Email Verification</Card.Title>
                
                {status === 'loading' && (
                  <div>
                    <div className="spinner-border text-primary mb-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Verifying your email...</p>
                  </div>
                )}
                
                {status === 'success' && (
                  <div>
                    <Alert variant="success">
                      {message}
                    </Alert>
                    <Button as={Link} to="/login" variant="primary">
                      Login to Your Account
                    </Button>
                  </div>
                )}
                
                {status === 'error' && (
                  <div>
                    <Alert variant="danger">
                      {message}
                    </Alert>
                    <Button as={Link} to="/register" variant="primary">
                      Register Again
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyEmail;