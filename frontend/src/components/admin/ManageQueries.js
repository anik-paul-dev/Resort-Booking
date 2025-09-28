import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchAdminQueries, fetchQueryById, updateQueryStatus, deleteQuery } from '../../services/api';
import { formatDate } from '../../utils/helpers';

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalQueries: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [responseForm, setResponseForm] = useState({
    status: 'read',
    response: '',
  });

  useEffect(() => {
    const loadQueries = async () => {
      try {
        setLoading(true);
        const response = await fetchAdminQueries(filters);
        setQueries(response.data.queries);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalQueries: response.data.totalQueries,
        });
      } catch (error) {
        console.error('Error loading queries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQueries();
  }, [filters]);

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

  const openResponseModal = async (queryId) => {
    try {
      const response = await fetchQueryById(queryId);
      setSelectedQuery(response.data);
      setResponseForm({
        status: response.data.status,
        response: response.data.response || '',
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error loading query:', error);
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
      await updateQueryStatus(selectedQuery._id, responseForm);
      // Refresh queries list
      const response = await fetchAdminQueries(filters);
      setQueries(response.data.queries);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating query status:', error);
    }
  };

  const handleDelete = async (queryId) => {
    if (window.confirm('Are you sure you want to delete this query?')) {
      try {
        await deleteQuery(queryId);
        // Refresh queries list
        const response = await fetchAdminQueries(filters);
        setQueries(response.data.queries);
      } catch (error) {
        console.error('Error deleting query:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading queries...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Queries</h1>
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="read">Read</option>
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
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map(query => (
              <tr key={query._id}>
                <td>{query.name}</td>
                <td>{query.email}</td>
                <td>{query.subject}</td>
                <td>{formatDate(query.createdAt)}</td>
                <td>
                  <span className={`badge ${
                    query.status === 'pending' ? 'bg-warning' : 
                    query.status === 'read' ? 'bg-success' : 'bg-danger'
                  }`}>
                    {query.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openResponseModal(query._id)}>
                    Respond
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(query._id)}>
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
          <Modal.Title>Respond to Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuery && (
            <>
              <h5>Query Details</h5>
              <p><strong>Name:</strong> {selectedQuery.name}</p>
              <p><strong>Email:</strong> {selectedQuery.email}</p>
              <p><strong>Subject:</strong> {selectedQuery.subject}</p>
              <p><strong>Message:</strong> {selectedQuery.message}</p>
              <p><strong>Date:</strong> {formatDate(selectedQuery.createdAt)}</p>
              
              <hr />
              
              <h5>Your Response</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={responseForm.status} onChange={handleResponseChange}>
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
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
            Send Response
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageQueries;