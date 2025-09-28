import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchFeatures, createFeature, updateFeature, deleteFeature } from '../../services/api';

const ManageFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setLoading(true);
        const response = await fetchFeatures();
        setFeatures(response.data.features);
      } catch (error) {
        console.error('Error loading features:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatures();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingFeature) {
        await updateFeature(editingFeature._id, formData);
      } else {
        await createFeature(formData);
      }
      
      // Refresh features list
      const response = await fetchFeatures();
      setFeatures(response.data.features);
      
      setShowModal(false);
      setEditingFeature(null);
      resetForm();
    } catch (error) {
      console.error('Error saving feature:', error);
    }
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setFormData({
      name: feature.name,
      icon: feature.icon || '',
      description: feature.description || '',
      isActive: feature.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (featureId) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await deleteFeature(featureId);
        // Refresh features list
        const response = await fetchFeatures();
        setFeatures(response.data.features);
      } catch (error) {
        console.error('Error deleting feature:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      description: '',
      isActive: true,
    });
  };

  const openAddModal = () => {
    setEditingFeature(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-5">Loading features...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Features</h1>
        <Button variant="primary" onClick={openAddModal}>
          Add New Feature
        </Button>
      </div>
      
      <Row>
        {features.map(feature => (
          <Col key={feature._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {feature.icon && <i className={`bi ${feature.icon} me-2`}></i>}
                  {feature.name}
                </Card.Title>
                <Card.Text>{feature.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`badge ${feature.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {feature.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(feature)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(feature._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingFeature ? 'Edit Feature' : 'Add New Feature'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Feature Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Icon (Bootstrap class)</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="e.g., bi-wifi"
              />
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
                {editingFeature ? 'Update Feature' : 'Add Feature'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageFeatures;