import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table, Modal, Form, Badge } from 'react-bootstrap'
import { FaEdit, FaTrash, FaStar, FaCheck, FaTimes } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const ReviewManagement = () => {
  const { reviews, loading, editReview, removeReview } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [formData, setFormData] = useState({
    status: 'pending',
    isRead: false
  })

  useEffect(() => {
    if (editingReview) {
      setFormData({
        status: editingReview.status,
        isRead: editingReview.isRead
      })
      setShowModal(true)
    }
  }, [editingReview])

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
      await editReview(editingReview._id, formData)
      
      setEditingReview(null)
      setShowModal(false)
    } catch (err) {
      console.error('Error updating review:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await removeReview(id)
      } catch (err) {
        console.error('Error deleting review:', err)
      }
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
  }

  const renderStars = (rating) => {
    return (
      <>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Review Management</h2>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Room</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th>Read</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id}>
                    <td>{review.user?.name}</td>
                    <td>{review.room?.name}</td>
                    <td>{renderStars(review.rating)}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                      {review.comment}
                    </td>
                    <td>
                      <Badge bg={
                        review.status === 'approved' ? 'success' : 
                        review.status === 'pending' ? 'warning' : 'danger'
                      }>
                        {review.status}
                      </Badge>
                    </td>
                    <td>
                      {review.isRead ? (
                        <Badge bg="success"><FaCheck /> Read</Badge>
                      ) : (
                        <Badge bg="warning"><FaTimes /> Unread</Badge>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleEdit(review)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleDelete(review._id)}
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
      
      {/* Edit Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingReview && (
            <>
              <div className="mb-3">
                <h6>User</h6>
                <p>{editingReview.user?.name}</p>
              </div>
              
              <div className="mb-3">
                <h6>Room</h6>
                <p>{editingReview.room?.name}</p>
              </div>
              
              <div className="mb-3">
                <h6>Rating</h6>
                <p>{renderStars(editingReview.rating)}</p>
              </div>
              
              <div className="mb-3">
                <h6>Comment</h6>
                <p>{editingReview.comment}</p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
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
                
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Update Review
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

export default ReviewManagement