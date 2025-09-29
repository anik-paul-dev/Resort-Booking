import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash, FaSwimmingPool } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const FacilityManagement = () => {
  const { facilities, loading, addFacility, editFacility, removeFacility } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingFacility, setEditingFacility] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    isActive: true
  })

  useEffect(() => {
    if (editingFacility) {
      setFormData(editingFacility)
      setShowModal(true)
    }
  }, [editingFacility])

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
      if (editingFacility) {
        await editFacility(editingFacility._id, formData)
      } else {
        await addFacility(formData)
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        icon: '',
        isActive: true
      })
      
      setEditingFacility(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error saving facility:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await removeFacility(id)
      } catch (err) {
        console.error('Error deleting facility:', err)
      }
    }
  }

  const handleAddNew = () => {
    setEditingFacility(null)
    setFormData({
      name: '',
      description: '',
      icon: '',
      isActive: true
    })
    setShowModal(true)
  }

  const iconOptions = [
    'swimming-pool',
    'spa',
    'restaurant',
    'gym',
    'kids-club',
    'concierge',
    'parking',
    'wifi',
    'breakfast',
    'bar',
    'beach',
    'tennis',
    'golf'
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Facility Management</h2>
        <Button onClick={handleAddNew}>
          <FaPlus className="me-2" /> Add New Facility
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
                {facilities.map(facility => (
                  <tr key={facility._id}>
                    <td>{facility.name}</td>
                    <td>{facility.description}</td>
                    <td>{facility.icon}</td>
                    <td>
                      {facility.isActive ? (
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
                        onClick={() => setEditingFacility(facility)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(facility._id)}
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
      
      {/* Add/Edit Facility Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                {editingFacility ? 'Update Facility' : 'Add Facility'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FacilityManagement