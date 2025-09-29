import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form, Badge } from 'react-bootstrap'
import { FaEdit, FaTrash, FaEnvelope, FaCheck, FaReply } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const QueryManagement = () => {
  const { queries, loading, editQuery, removeQuery } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingQuery, setEditingQuery] = useState(null)
  const [formData, setFormData] = useState({
    status: 'pending',
    isRead: false,
    reply: ''
  })

  useEffect(() => {
    if (editingQuery) {
      setFormData({
        status: editingQuery.status,
        isRead: editingQuery.isRead,
        reply: editingQuery.reply || ''
      })
      setShowModal(true)
    }
  }, [editingQuery])

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
      await editQuery(editingQuery._id, formData)
      
      setEditingQuery(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error updating query:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this query?')) {
      try {
        await removeQuery(id)
      } catch (err) {
        console.error('Error deleting query:', err)
      }
    }
  }

  const handleEdit = (query) => {
    setEditingQuery(query)
  }

  return (
    <div>
      <h2 className="mb-4">Query Management</h2>
      
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
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Read</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(query => (
                  <tr key={query._id}>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                      {query.subject}
                    </td>
                    <td>
                      <Badge bg={
                        query.status === 'replied' ? 'success' : 
                        query.status === 'read' ? 'info' : 
                        query.status === 'closed' ? 'secondary' : 'warning'
                      }>
                        {query.status}
                      </Badge>
                    </td>
                    <td>
                      {query.isRead ? (
                        <Badge bg="success"><FaCheck /> Read</Badge>
                      ) : (
                        <Badge bg="warning"><FaTimes /> Unread</Badge>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleEdit(query)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleDelete(query._id)}
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
      
      {/* Edit Query Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingQuery && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>From</h6>
                  <p><strong>Name:</strong> {editingQuery.name}</p>
                  <p><strong>Email:</strong> {editingQuery.email}</p>
                </Col>
                <Col md={6}>
                  <h6>Date</h6>
                  <p>{new Date(editingQuery.createdAt).toLocaleString()}</p>
                </Col>
              </Row>
              
              <div className="mb-3">
                <h6>Subject</h6>
                <p>{editingQuery.subject}</p>
              </div>
              
              <div className="mb-3">
                <h6>Message</h6>
                <Card>
                  <Card.Body>
                    {editingQuery.message}
                  </Card.Body>
                </Card>
              </div>
              
              {editingQuery.reply && (
                <div className="mb-3">
                  <h6>Previous Reply</h6>
                  <Card>
                    <Card.Body>
                      {editingQuery.reply}
                    </Card.Body>
                  </Card>
                </div>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Mark as Read"
                    name="isRead"
                    checked={formData.isRead}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Reply</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="reply"
                    value={formData.reply}
                    onChange={handleInputChange}
                    placeholder="Type your reply here..."
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <FaReply className="me-2" />
                    Update Query
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default QueryManagement