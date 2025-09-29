import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form, Badge } from 'react-bootstrap'
import { FaEdit, FaTrash, FaUser, FaCheck, FaTimes } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const UserManagement = () => {
  const { users, loading, editUser, removeUser } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    isActive: true,
    isVerified: false
  })

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser)
      setShowModal(true)
    }
  }, [editingUser])

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
      await editUser(editingUser._id, formData)
      
      setEditingUser(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error updating user:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await removeUser(id)
      } catch (err) {
        console.error('Error deleting user:', err)
      }
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
  }

  return (
    <div>
      <h2 className="mb-4">User Management</h2>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      {user.isActive ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Inactive</Badge>
                      )}
                    </td>
                    <td>
                      {user.isVerified ? (
                        <Badge bg="success"><FaCheck /> Verified</Badge>
                      ) : (
                        <Badge bg="warning"><FaTimes /> Not Verified</Badge>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleEdit(user)}
                      >
                        <FaEdit />
                      </Button>
                      {user.role !== 'admin' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          className="ms-2"
                          onClick={() => handleDelete(user._id)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      
      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled
              />
              <Form.Text className="text-muted">Email cannot be changed</Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            
            <Row>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Verified"
                    name="isVerified"
                    checked={formData.isVerified}
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
                Update User
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserManagement