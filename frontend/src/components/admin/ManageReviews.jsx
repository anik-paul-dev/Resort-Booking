import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchAdminReviews, fetchReviewById, updateReviewStatus, deleteReview, fetchReviewStats } from '../../services/api';
import { formatDate, formatCurrency, generateStars } from '../utils/helpers.jsx';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalReviews: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseForm, setResponseForm] = useState({
    status: 'pending',
    response: '',
  });
  const [stats, setStats] = useState(null);
  const [statsPeriod, setStatsPeriod] = useState('month');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const response = await fetchAdminReviews(filters);
        setReviews(response.data.reviews);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalReviews: response.data.totalReviews,
        });
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [filters]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchReviewStats(statsPeriod);
        setStats(response.data);
      } catch (error) {
        console.error('Error loading review stats:', error);
      }
    };

    loadStats();
  }, [statsPeriod]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  };

  const handleStatsPeriodChange = (e) => {
    setStatsPeriod(e.target.value);
  };

  const openResponseModal = async (reviewId) => {
    try {
      const response = await fetchReviewById(reviewId);
      setSelectedReview(response.data);
      setResponseForm({
        status: response.data.status,
        response: response.data.response || '',
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error loading review:', error);
    }
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponseSubmit = async () => {
    try {
      await updateReviewStatus(selectedReview._id, responseForm);
      // Refresh reviews list
      const response = await fetchAdminReviews(filters);
      setReviews(response.data.reviews);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        // Refresh reviews list
        const response = await fetchAdminReviews(filters);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return <div className="text-center py-5">Loading reviews...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Reviews</h1>
      </div>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Reviews</Card.Title>
              <Card.Text className="stat-value">{stats?.totalReviews || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Average Rating</Card.Title>
              <Card.Text className="stat-value">{stats?.avgRating?.toFixed(1) || '0.0'}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Reviews</Card.Title>
              <Card.Text className="stat-value">
                {reviews.filter(r => r.status === 'pending').length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Period</Card.Title>
              <Form.Select value={statsPeriod} onChange={handleStatsPeriodChange}>
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <Button variant="outline-secondary" className="w-100" onClick={() => setFilters({ page: 1, limit: 10, status: '' })}>
                  Reset Filters
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Room</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id}>
                <td>{review.user?.name}</td>
                <td>{review.room?.name}</td>
                <td>{renderStars(review.rating)}</td>
                <td>{review.comment.substring(0, 50)}...</td>
                <td>{formatDate(review.createdAt)}</td>
                <td>
                  <span className={`badge ${
                    review.status === 'pending' ? 'bg-warning' : 
                    review.status === 'approved' ? 'bg-success' : 'bg-danger'
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openResponseModal(review._id)}>
                    Review
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(review._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination.totalPages > 1 && (
        <div className="pagination-container d-flex justify-content-center mt-4">
          <Button 
            variant="outline-primary" 
            disabled={pagination.currentPage === 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="me-2"
          >
            Previous
          </Button>
          <span className="mx-3">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button 
            variant="outline-primary" 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="ms-2"
          >
            Next
          </Button>
        </div>
      )}
      
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <>
              <h5>Review Information</h5>
              <p><strong>User:</strong> {selectedReview.user?.name}</p>
              <p><strong>Room:</strong> {selectedReview.room?.name}</p>
              <p><strong>Rating:</strong> {renderStars(selectedReview.rating)}</p>
              <p><strong>Comment:</strong> {selectedReview.comment}</p>
              <p><strong>Date:</strong> {formatDate(selectedReview.createdAt)}</p>
              
              <hr />
              
              <h5>Your Response</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={responseForm.status} onChange={handleResponseChange}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Response</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="response"
                    value={responseForm.response}
                    onChange={handleResponseChange}
                    rows={5}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleResponseSubmit}>
            Save Response
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageReviews;