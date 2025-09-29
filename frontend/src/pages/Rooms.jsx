import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import RoomCard from '../components/ui/RoomCard'
import Pagination from '../components/ui/Pagination'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useRooms } from '../hooks/useRooms'
import { FaFilter, FaSearch } from 'react-icons/fa'

const Rooms = () => {
  const { rooms, loading, error } = useRooms()
  const [filteredRooms, setFilteredRooms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [roomsPerPage] = useState(6)
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [capacity, setCapacity] = useState({ adults: 0, children: 0 })
  const [features, setFeatures] = useState([])
  const [sortBy, setSortBy] = useState('priceLowToHigh')

  // Get unique features from all rooms
  const allFeatures = [...new Set(rooms.flatMap(room => room.features))]

  useEffect(() => {
    // Apply filters and sorting
    let result = [...rooms]
    
    // Filter by price
    result = result.filter(room => 
      room.pricePerNight >= priceRange.min && room.pricePerNight <= priceRange.max
    )
    
    // Filter by capacity
    if (capacity.adults > 0) {
      result = result.filter(room => room.capacity.adults >= capacity.adults)
    }
    
    if (capacity.children > 0) {
      result = result.filter(room => room.capacity.children >= capacity.children)
    }
    
    // Filter by features
    if (features.length > 0) {
      result = result.filter(room => 
        features.every(feature => room.features.includes(feature))
      )
    }
    
    // Sort rooms
    switch (sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.pricePerNight - b.pricePerNight)
        break
      case 'priceHighToLow':
        result.sort((a, b) => b.pricePerNight - a.pricePerNight)
        break
      case 'ratingHighToLow':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'nameAToZ':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    
    setFilteredRooms(result)
  }, [rooms, priceRange, capacity, features, sortBy])

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage)

  const handleFeatureToggle = (feature) => {
    if (features.includes(feature)) {
      setFeatures(features.filter(f => f !== feature))
    } else {
      setFeatures([...features, feature])
    }
  }

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 1000 })
    setCapacity({ adults: 0, children: 0 })
    setFeatures([])
    setSortBy('priceLowToHigh')
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Our Rooms</h1>
      
      <Row>
        {/* Filters Sidebar */}
        <Col md={3} className="mb-4">
          <Card>
            <Card.Header>
              <FaFilter className="me-2" /> Filters
            </Card.Header>
            <Card.Body>
              <Form>
                {/* Price Range Filter */}
                <Form.Group className="mb-3">
                  <Form.Label>Price Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 1000})}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                
                {/* Capacity Filter */}
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Row>
                    <Col>
                      <Form.Label>Adults</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={capacity.adults}
                        onChange={(e) => setCapacity({...capacity, adults: parseInt(e.target.value) || 0})}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Children</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={capacity.children}
                        onChange={(e) => setCapacity({...capacity, children: parseInt(e.target.value) || 0})}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                
                {/* Features Filter */}
                <Form.Group className="mb-3">
                  <Form.Label>Features</Form.Label>
                  {allFeatures.map(feature => (
                    <Form.Check 
                      key={feature}
                      type="checkbox"
                      label={feature}
                      checked={features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mb-2"
                    />
                  ))}
                </Form.Group>
                
                {/* Sort By */}
                <Form.Group className="mb-3">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="ratingHighToLow">Rating: High to Low</option>
                    <option value="nameAToZ">Name: A to Z</option>
                  </Form.Select>
                </Form.Group>
                
                <Button variant="primary" onClick={resetFilters} className="w-100">
                  Reset Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Rooms Grid */}
        <Col md={9}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {filteredRooms.length === 0 ? (
                <div className="text-center py-5">
                  <h3>No rooms found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              ) : (
                <>
                  <Row>
                    {currentRooms.map(room => (
                      <Col key={room._id} md={6} lg={4} className="mb-4">
                        <RoomCard room={room} />
                      </Col>
                    ))}
                  </Row>
                  
                  {totalPages > 1 && (
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Rooms