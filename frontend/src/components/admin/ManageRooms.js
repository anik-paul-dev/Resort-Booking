import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchRooms, createRoom, updateRoom, deleteRoom, fetchFeatures, fetchFacilities } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: {
      adults: 1,
      children: 0,
    },
    features: [],
    facilities: [],
    isActive: true,
    size: '',
    bedType: '',
    view: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const roomsResponse = await fetchRooms();
        setRooms(roomsResponse.data.rooms);
        
        const featuresResponse = await fetchFeatures();
        setFeatures(featuresResponse.data.features);
        
        const facilitiesResponse = await fetchFacilities();
        setFacilities(facilitiesResponse.data.facilities);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('capacity.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          [field]: type === 'checkbox' ? (checked ? 1 : 0) : parseInt(value),
        },
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter(id => id !== value),
    }));
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      facilities: checked
        ? [...prev.facilities, value]
        : prev.facilities.filter(id => id !== value),
    }));
  };

  const handleImageUpload = (e) => {
    // This would be implemented with Cloudinary upload
    console.log('Image upload:', e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, formData);
      } else {
        await createRoom(formData);
      }
      
      // Refresh rooms list
      const roomsResponse = await fetchRooms();
      setRooms(roomsResponse.data.rooms);
      
      setShowModal(false);
      setEditingRoom(null);
      resetForm();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      features: room.features.map(f => f._id),
      facilities: room.facilities.map(f => f._id),
      isActive: room.isActive,
      size: room.size || '',
      bedType: room.bedType || '',
      view: room.view || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
        // Refresh rooms list
        const roomsResponse = await fetchRooms();
        setRooms(roomsResponse.data.rooms);
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      capacity: {
        adults: 1,
        children: 0,
      },
      features: [],
      facilities: [],
      isActive: true,
      size: '',
      bedType: '',
      view: '',
    });
  };

  const openAddModal = () => {
    setEditingRoom(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-5">Loading rooms...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Rooms</h1>
        <Button variant="primary" onClick={openAddModal}>
          Add New Room
        </Button>
      </div>
      
      <Row>
        {rooms.map(room => (
          <Col key={room._id} md={4} className="mb-4">
            <Card>
              {room.images && room.images.length > 0 && (
                <Card.Img variant="top" src={room.images[0]} alt={room.name} />
              )}
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>
                  <div>Price: {formatCurrency(room.price)} / night</div>
                  <div>Capacity: {room.capacity.adults} adults, {room.capacity.children} children</div>
                  <div>Status: {room.isActive ? 'Active' : 'Inactive'}</div>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(room)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
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
                  <Form.Label>Price per Night</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
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
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Adults</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity.adults"
                    value={formData.capacity.adults}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Children</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity.children"
                    value={formData.capacity.children}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g., 30 sqm"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Bed Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="bedType"
                    value={formData.bedType}
                    onChange={handleInputChange}
                    placeholder="e.g., King Size"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>View</Form.Label>
                  <Form.Control
                    type="text"
                    name="view"
                    value={formData.view}
                    onChange={handleInputChange}
                    placeholder="e.g., Ocean View"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageUpload}
              />
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
                    value={feature._id}
                    checked={formData.features.includes(feature._id)}
                    onChange={handleFeatureChange}
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
                    value={facility._id}
                    checked={formData.facilities.includes(facility._id)}
                    onChange={handleFacilityChange}
                  />
                ))}
              </div>
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingRoom ? 'Update Room' : 'Add Room'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageRooms;