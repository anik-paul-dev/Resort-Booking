import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchCarousel, createCarousel, updateCarousel, deleteCarousel } from '../../services/api';

const ManageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    const loadCarousel = async () => {
      try {
        setLoading(true);
        const response = await fetchCarousel();
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error loading carousel items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCarousel();
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
      if (editingItem) {
        await updateCarousel(editingItem._id, formData);
      } else {
        await createCarousel(formData);
      }
      
      // Refresh carousel items
      const response = await fetchCarousel();
      setCarouselItems(response.data);
      
      setShowModal(false);
      setEditingItem(null);
      resetForm();
    } catch (error) {
      console.error('Error saving carousel item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image,
      description: item.description || '',
      buttonText: item.buttonText || '',
      buttonLink: item.buttonLink || '',
      isActive: item.isActive,
      order: item.order,
    });
    setShowModal(true);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this carousel item?')) {
      try {
        await deleteCarousel(itemId);
        // Refresh carousel items
        const response = await fetchCarousel();
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error deleting carousel item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      isActive: true,
      order: 0,
    });
  };

  const openAddModal = () => {
    setEditingItem(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-5">Loading carousel items...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Carousel</h1>
        <Button variant="primary" onClick={openAddModal}>
          Add New Item
        </Button>
      </div>
      
      <Row>
        {carouselItems.map(item => (
          <Col key={item._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className={`badge ${item.isActive ? 'bg-success' : 'bg-secondary'} me-2`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="badge bg-info">
                      Order: {item.order}
                    </span>
                  </div>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item._id)}>
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
          <Modal.Title>{editingItem ? 'Edit Carousel Item' : 'Add New Carousel Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
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
                  <img src={formData.image} alt="Carousel" className="img-thumbnail" style={{ maxHeight: '100px' }} />
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
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
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
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageCarousel;