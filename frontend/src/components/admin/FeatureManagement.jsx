import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const FeatureManagement = () => {
  const { features, loading, addFeature, editFeature, removeFeature } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingFeature, setEditingFeature] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    isActive: true
  })

  useEffect(() => {
    if (editingFeature) {
      setFormData(editingFeature)
      setShowModal(true)
    }
  }, [editingFeature])

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
      if (editingFeature) {
        await editFeature(editingFeature._id, formData)
      } else {
        await addFeature(formData)
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        icon: '',
        isActive: true
      })
      
      setEditingFeature(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error saving feature:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await removeFeature(id)
      } catch (err) {
        console.error('Error deleting feature:', err)
      }
    }
  }

  const handleAddNew = () => {
    setEditingFeature(null)
    setFormData({
      name: '',
      description: '',
      icon: '',
      isActive: true
    })
    setShowModal(true)
  }

  const iconOptions = [
    'ocean',
    'balcony',
    'bath',
    'bed',
    'mini-bar',
    'tv',
    'ac',
    'safe',
    'wifi',
    'parking',
    'concierge'
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Feature Management</h2>
        <Button onClick={handleAddNew}>
          <FaPlus className="me-2" /> Add New Feature
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
                  <th>Description</th>
                  <th>Icon</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {features.map(feature => (
                  <tr key={feature._id}>
                    <td>{feature.name}</td>
                    <td>{feature.description}</td>
                    <td>{feature.icon}</td>
                    <td>
                      {feature.isActive ? (
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
                        onClick={() => setEditingFeature(feature)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(feature._id)}
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
      
      {/* Add/Edit Feature Modal */}
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
            
            <Form.Group className="mb-3">
              <Form.Label>Icon</Form.Label>
              <Form.Select
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an icon</option>
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingFeature ? 'Update Feature' : 'Add Feature'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FeatureManagement