import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchFacilities, createFacility, updateFacility, deleteFacility } from '../../services/api';

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    openingHours: '',
    isActive: true,
  });

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);
        const response = await fetchFacilities();
        setFacilities(response.data.facilities);
      } catch (error) {
        console.error('Error loading facilities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    // This would be implemented with Cloudinary upload
    console.log('Image upload:', e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingFacility) {
        await updateFacility(editingFacility._id, formData);
      } else {
        await createFacility(formData);
      }
      
      // Refresh facilities list
      const response = await fetchFacilities();
      setFacilities(response.data.facilities);
      
      setShowModal(false);
      setEditingFacility(null);
      resetForm();
    } catch (error) {
      console.error('Error saving facility:', error);
    }
  };

  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      image: facility.image || '',
      description: facility.description || '',
      openingHours: facility.openingHours || '',
      isActive: facility.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (facilityId) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await deleteFacility(facilityId);
        // Refresh facilities list
        const response = await fetchFacilities();
        setFacilities(response.data.facilities);
      } catch (error) {
        console.error('Error deleting facility:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      description: '',
      openingHours: '',
      isActive: true,
    });
  };

  const openAddModal = () => {
    setEditingFacility(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-5">Loading facilities...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Facilities</h1>
        <Button variant="primary" onClick={openAddModal}>
          Add New Facility
        </Button>
      </div>
      
      <Row>
        {facilities.map(facility => (
          <Col key={facility._id} md={4} className="mb-4">
            <Card>
              {facility.image && (
                <Card.Img variant="top" src={facility.image} alt={facility.name} />
              )}
              <Card.Body>
                <Card.Title>{facility.name}</Card.Title>
                <Card.Text>{facility.description}</Card.Text>
                {facility.openingHours && (
                  <Card.Text>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i> {facility.openingHours}
                    </small>
                  </Card.Text>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`badge ${facility.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {facility.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(facility)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(facility._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingFacility ? 'Edit Facility' : 'Add New Facility'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Facility Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageUpload}
              />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Facility" className="img-thumbnail" style={{ maxHeight: '100px' }} />
                </div>
              )}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Opening Hours</Form.Label>
              <Form.Control
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleInputChange}
                placeholder="e.g., 9:00 AM - 6:00 PM"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingFacility ? 'Update Facility' : 'Add Facility'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageFacilities;