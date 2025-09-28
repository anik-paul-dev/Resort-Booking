import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { fetchAdminUsers, updateUserStatus, deleteUser } from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    isActive: '',
    isVerified: '',
    role: '',
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalUsers: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusForm, setStatusForm] = useState({
    isActive: true,
    isVerified: false,
    role: 'user',
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchAdminUsers(filters);
        setUsers(response.data.users);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalUsers: response.data.totalUsers,
        });
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
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

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setStatusForm({
      isActive: user.isActive,
      isVerified: user.isVerified,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleStatusChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStatusForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleStatusSubmit = async () => {
    try {
      await updateUserStatus(selectedUser._id, statusForm);
      // Refresh users list
      const response = await fetchAdminUsers(filters);
      setUsers(response.data.users);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        // Refresh users list
        const response = await fetchAdminUsers(filters);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading users...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Users</h1>
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="isActive" value={filters.isActive} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Verification</Form.Label>
                <Form.Select name="isVerified" value={filters.isVerified} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <Button variant="outline-secondary" className="w-100" onClick={() => setFilters({ page: 1, limit: 10, isActive: '', isVerified: '', role: '' })}>
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
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.isVerified ? 'bg-success' : 'bg-warning'}`}>
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openStatusModal(user)}>
                    Edit Status
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user._id)}>
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
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={statusForm.isActive}
                onChange={handleStatusChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isVerified"
                label="Verified"
                checked={statusForm.isVerified}
                onChange={handleStatusChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={statusForm.role} onChange={handleStatusChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStatusSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;