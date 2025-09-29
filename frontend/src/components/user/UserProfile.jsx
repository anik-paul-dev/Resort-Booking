import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { FaUser, FaSave, FaLock } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../common/LoadingSpinner'

const UserProfile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // In a real app, this would call an API to update the user profile
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        setLoading(false)
        setShowSuccess(true)
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      }, 1000)
    } catch (err) {
      console.error('Error updating profile:', err)
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    
    try {
      // In a real app, this would call an API to change the password
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        setLoading(false)
        setShowPasswordSuccess(true)
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowPasswordSuccess(false)
        }, 3000)
      }, 1000)
    } catch (err) {
      console.error('Error changing password:', err)
      setLoading(false)
      setPasswordError('Failed to change password')
    }
  }

  return (
    <div>
      <h2 className="mb-4">My Profile</h2>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Profile updated successfully!
        </Alert>
      )}
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0"><FaUser className="me-2" />Personal Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                      <Form.Text className="text-muted">Email cannot be changed</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h5 className="mb-0"><FaLock className="me-2" />Change Password</h5>
            </Card.Header>
            <Card.Body>
              {showPasswordSuccess && (
                <Alert variant="success" onClose={() => setShowPasswordSuccess(false)} dismissible>
                  Password changed successfully!
                </Alert>
              )}
              
              {passwordError && (
                <Alert variant="danger" onClose={() => setPasswordError('')} dismissible>
                  {passwordError}
                </Alert>
              )}
              
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Form.Text className="text-muted">Password must be at least 6 characters</Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                <img 
                  src={user?.avatar || '/images/default-avatar.png'} 
                  alt="Profile" 
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <h4>{user?.name}</h4>
              <p className="text-muted">{user?.email}</p>
              <Badge bg={user?.role === 'admin' ? 'danger' : 'primary'}>
                {user?.role === 'admin' ? 'Administrator' : 'Guest'}
              </Badge>
              
              <hr className="my-4" />
              
              <h6>Account Information</h6>
              <p className="text-start">
                <strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}
              </p>
              <p className="text-start">
                <strong>Status:</strong> {user?.isActive ? 'Active' : 'Inactive'}
              </p>
              <p className="text-start">
                <strong>Verified:</strong> {user?.isVerified ? 'Yes' : 'No'}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UserProfile