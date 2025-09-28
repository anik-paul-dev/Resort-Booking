import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchFacilities } from '../../services/api';
import FacilityCard from '../ui/FacilityCard';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);
        const response = await fetchFacilities({ isActive: true });
        setFacilities(response.data.facilities);
      } catch (error) {
        console.error('Error loading facilities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading facilities...</div>;
  }

  return (
    <div className="facilities-page py-5">
      <Container>
        <h1 className="section-title">Resort Facilities</h1>
        
        {facilities.length === 0 ? (
          <div className="text-center py-5">
            <h4>No facilities available</h4>
          </div>
        ) : (
          <Row>
            {facilities.map(facility => (
              <Col key={facility._id} md={4} className="mb-4">
                <FacilityCard facility={facility} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Facilities;