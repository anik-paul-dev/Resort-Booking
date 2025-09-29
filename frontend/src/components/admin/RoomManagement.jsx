import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaBed } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const RoomManagement = () => {
  const { rooms, loading, addRoom, editRoom, removeRoom } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerNight: '',
    capacity: { adults: '', children: '' },
    bedType: '',
    bathroom: '',
    internet: '',
    features: [],
    facilities: [],
    size: '',
    available: true,
    isFeatured: false
  })

  useEffect(() => {
    if (editingRoom) {
      setFormData(editingRoom)
      setShowModal(true)
    }
  }, [editingRoom])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      })
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleFeaturesChange = (e) => {
    const options = e.target.options
    const selectedFeatures = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedFeatures.push(options[i].value)
      }
    }
    setFormData({
      ...formData,
      features: selectedFeatures
    })
  }

  const handleFacilitiesChange = (e) => {
    const options = e.target.options
    const selectedFacilities = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedFacilities.push(options[i].value)
      }
    }
    setFormData({
      ...formData,
      facilities: selectedFacilities
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingRoom) {
        await editRoom(editingRoom._id, formData)
      } else {
        await addRoom(formData)
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        pricePerNight: '',
        capacity: { adults: '', children: '' },
        bedType: '',
        bathroom: '',
        internet: '',
        features: [],
        facilities: [],
        size: '',
        available: true,
        isFeatured: false
      })
      
      setEditingRoom(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error saving room:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await removeRoom(id)
      } catch (err) {
        console.error('Error deleting room:', err)
      }
    }
  }

  const handleAddNew = () => {
    setEditingRoom(null)
    setFormData({
      name: '',
      description: '',
      pricePerNight: '',
      capacity: { adults: '', children: '' },
      bedType: '',
      bathroom: '',
      internet: '',
      features: [],
      facilities: [],
      size: '',
      available: true,
      isFeatured: false
    })
    setShowModal(true)
  }

  const featureOptions = [
    'Air Conditioning',
    'Mini Bar',
    'Safe',
    'TV',
    'Balcony',
    'Living Area',
    'Kitchenette',
    'Ocean View',
    'Mountain View',
    'Bathtub',
    'Shower',
    'Hair Dryer',
    'Iron',
    'Coffee Maker'
  ]

  const facilityOptions = [
    'Swimming Pool',
    'Restaurant',
    'Spa',
    'Gym',
    'Kids Club',
    'Concierge',
    'Parking',
    'WiFi',
    'Breakfast',
    'Bar',
    'Beach Access',
    'Tennis Court',
    'Golf Course'
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Room Management</h2>
        <Button onClick={handleAddNew}>
          <FaPlus className="me-2" /> Add New Room
        </Button>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price/Night</th>
                  <th>Capacity</th>
                  <th>Features</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room._id}>
                    <td>{room.name}</td>
                    <td>${room.pricePerNight}</td>
                    <td>{room.capacity.adults} Adults, {room.capacity.children} Children</td>
                    <td>{room.features.slice(0, 2).join(', ')} {room.features.length > 2 ? '...' : ''}</td>
                    <td>
                      {room.available ? (
                        <span className="badge bg-success">Available</span>
                      ) : (
                        <span className="badge bg-danger">Unavailable</span>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => setEditingRoom(room)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(room._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      
      {/* Add/Edit Room Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? 'Edit Room' : 'Add New Room'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price Per Night ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Adult Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity.adults"
                    value={formData.capacity.adults}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Children Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity.children"
                    value={formData.capacity.children}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bed Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="bedType"
                    value={formData.bedType}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Size (sqm)</Form.Label>
                  <Form.Control
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bathroom</Form.Label>
                  <Form.Control
                    type="text"
                    name="bathroom"
                    value={formData.bathroom}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Internet</Form.Label>
                  <Form.Control
                    type="text"
                    name="internet"
                    value={formData.internet}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Features</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={formData.features}
                    onChange={handleFeaturesChange}
                  >
                    {featureOptions.map(feature => (
                      <option key={feature} value={feature}>{feature}</option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">Hold Ctrl/Cmd to select multiple</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Facilities</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={formData.facilities}
                    onChange={handleFacilitiesChange}
                  >
                    {facilityOptions.map(facility => (
                      <option key={facility} value={facility}>{facility}</option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">Hold Ctrl/Cmd to select multiple</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Available"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Featured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingRoom ? 'Update Room' : 'Add Room'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RoomManagement