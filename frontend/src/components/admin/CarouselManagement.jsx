import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash, FaImages } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const CarouselManagement = () => {
  const { carousels, loading, addCarousel, editCarousel, removeCarousel } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingCarousel, setEditingCarousel] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    buttonText: '',
    isActive: true,
    order: 0
  })

  useEffect(() => {
    if (editingCarousel) {
      setFormData(editingCarousel)
      setShowModal(true)
    }
  }, [editingCarousel])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingCarousel) {
        await editCarousel(editingCarousel._id, formData)
      } else {
        await addCarousel(formData)
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        link: '',
        buttonText: '',
        isActive: true,
        order: 0
      })
      
      setEditingCarousel(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error saving carousel:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this carousel?')) {
      try {
        await removeCarousel(id)
      } catch (err) {
        console.error('Error deleting carousel:', err)
      }
    }
  }

  const handleAddNew = () => {
    setEditingCarousel(null)
    setFormData({
      title: '',
      description: '',
      link: '',
      buttonText: '',
      isActive: true,
      order: 0
    })
    setShowModal(true)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Carousel Management</h2>
        <Button onClick={handleAddNew}>
          <FaPlus className="me-2" /> Add New Carousel
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
                  <th>Order</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Button Text</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carousels.map(carousel => (
                  <tr key={carousel._id}>
                    <td>{carousel.order}</td>
                    <td>{carousel.title}</td>
                    <td>{carousel.description}</td>
                    <td>{carousel.buttonText || 'N/A'}</td>
                    <td>
                      {carousel.isActive ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => setEditingCarousel(carousel)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(carousel._id)}
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
      
      {/* Add/Edit Carousel Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCarousel ? 'Edit Carousel' : 'Add New Carousel'}</Modal.Title>
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
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="e.g. /rooms"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    placeholder="e.g. Learn More"
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
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    name="isActive"
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
              <Button type="submit">
                {editingCarousel ? 'Update Carousel' : 'Add Carousel'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CarouselManagement