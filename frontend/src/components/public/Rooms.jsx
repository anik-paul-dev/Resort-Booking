import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import RoomCard from '../ui/RoomCard';
import { fetchRooms, fetchFeatures, fetchFacilities } from '../../services/api';
import { formatCurrency } from '../utils/helpers.jsx';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    features: [],
    facilities: [],
    capacity: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalRooms: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch rooms with filters
        const roomsResponse = await fetchRooms(filters);
        setRooms(roomsResponse.data.rooms);
        setPagination({
          totalPages: roomsResponse.data.totalPages,
          currentPage: roomsResponse.data.currentPage,
          totalRooms: roomsResponse.data.totalRooms,
        });
        
        // Fetch features and facilities for filter options
        const featuresResponse = await fetchFeatures({ isActive: true });
        setFeatures(featuresResponse.data.features);
        
        const facilitiesResponse = await fetchFacilities({ isActive: true });
        setFacilities(facilitiesResponse.data.facilities);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'features' || name === 'facilities') {
      const currentValues = filters[name];
      let newValues;
      
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(item => item !== value);
      }
      
      setFilters(prev => ({
        ...prev,
        [name]: newValues,
        page: 1,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value,
        page: 1,
      }));
    }
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 6,
      features: [],
      facilities: [],
      capacity: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="rooms-page py-5">
      <Container>
        <h1 className="section-title">Our Rooms</h1>
        
        <Row>
          <Col md={3} className="mb-4">
            <div className="filter-card p-3 bg-white rounded shadow-sm">
              <h4 className="mb-3">Filters</h4>
              
              <Form.Group className="mb-3">
                <Form.Label>Sort By</Form.Label>
                <Form.Select value={`${filters.sortBy}-${filters.sortOrder}`} onChange={handleSortChange}>
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Capacity (Adults)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="capacity" 
                  value={filters.capacity} 
                  onChange={handleFilterChange} 
                  min="1"
                  placeholder="Minimum adults"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Price Range</Form.Label>
                <Row>
                  <Col>
                    <Form.Control 
                      type="number" 
                      name="minPrice" 
                      value={filters.minPrice} 
                      onChange={handleFilterChange} 
                      placeholder="Min"
                    />
                  </Col>
                  <Col>
                    <Form.Control 
                      type="number" 
                      name="maxPrice" 
                      value={filters.maxPrice} 
                      onChange={handleFilterChange} 
                      placeholder="Max"
                    />
                  </Col>
                </Row>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Features</Form.Label>
                <div className="feature-options">
                  {features.map(feature => (
                    <Form.Check 
                      key={feature._id}
                      type="checkbox"
                      id={`feature-${feature._id}`}
                      label={feature.name}
                      name="features"
                      value={feature._id}
                      checked={filters.features.includes(feature._id)}
                      onChange={handleFilterChange}
                    />
                  ))}
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Facilities</Form.Label>
                <div className="facility-options">
                  {facilities.map(facility => (
                    <Form.Check 
                      key={facility._id}
                      type="checkbox"
                      id={`facility-${facility._id}`}
                      label={facility.name}
                      name="facilities"
                      value={facility._id}
                      checked={filters.facilities.includes(facility._id)}
                      onChange={handleFilterChange}
                    />
                  ))}
                </div>
              </Form.Group>
              
              <Button variant="outline-primary" className="w-100 mb-2" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </Col>
          
          <Col md={9}>
            {loading ? (
              <div className="text-center py-5">Loading rooms...</div>
            ) : (
              <>
                {rooms.length === 0 ? (
                  <div className="text-center py-5">
                    <h4>No rooms found matching your criteria</h4>
                    <Button variant="primary" onClick={resetFilters}>Reset Filters</Button>
                  </div>
                ) : (
                  <>
                    <Row>
                      {rooms.map(room => (
                        <Col key={room._id} md={6} lg={4} className="mb-4">
                          <RoomCard room={room} />
                        </Col>
                      ))}
                    </Row>
                    
                    {pagination.totalPages > 1 && (
                      <div className="pagination-container d-flex justify-content-center mt-4">
                        <Button 
                          variant="outline-primary" 
                          disabled={pagination.currentPage === 1}
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          className="me-2"
                        >
                          Previous
                        </Button>
                        <span className="mx-3">
                          Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <Button 
                          variant="outline-primary" 
                          disabled={pagination.currentPage === pagination.totalPages}
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          className="ms-2"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rooms;