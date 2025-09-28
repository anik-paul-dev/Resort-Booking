import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchFeatures } from '../../services/api';

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setLoading(true);
        const response = await fetchFeatures({ isActive: true });
        setFeatures(response.data.features);
      } catch (error) {
        console.error('Error loading features:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatures();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading features...</div>;
  }

  return (
    <div className="features-page py-5">
      <Container>
        <h1 className="section-title">Resort Features</h1>
        
        {features.length === 0 ? (
          <div className="text-center py-5">
            <h4>No features available</h4>
          </div>
        ) : (
          <Row>
            {features.map(feature => (
              <Col key={feature._id} md={4} className="mb-4">
                <Card className="feature-card h-100">
                  <Card.Body className="text-center">
                    {feature.icon && (
                      <div className="feature-icon mb-3">
                        <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
                      </div>
                    )}
                    <Card.Title as="h3">{feature.name}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Features;