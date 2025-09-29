import React, { useState } from 'react'
import { Card, Row, Col, Button, Form, Alert, Badge } from 'react-bootstrap'
import { FaCog, FaSave, FaPowerOff, FaLock } from 'react-icons/fa'
import { useAdmin } from '../../hooks/useAdmin'
import LoadingSpinner from '../common/LoadingSpinner'

const Settings = () => {
  const { updateSiteSettings, loading } = useAdmin()
  const [formData, setFormData] = useState({
    siteName: 'Asian Resort',
    siteEmail: 'info@asianresort.com',
    sitePhone: '+62 123 456 7890',
    siteAddress: '123 Paradise Beach, Bali, Indonesia',
    bookingEnabled: true,
    bookingMessage: '',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently undergoing maintenance. Please check back later.'
  })
  const [showSuccess, setShowSuccess] = useState(false)

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
      await updateSiteSettings(formData)
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Error updating settings:', err)
    }
  }

  return (
    <div>
      <h2 className="mb-4">Site Settings</h2>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Settings updated successfully!
        </Alert>
      )}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h4 className="mb-4">General Settings</h4>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="siteEmail"
                    value={formData.siteEmail}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="sitePhone"
                    value={formData.sitePhone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteAddress"
                    value={formData.siteAddress}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <hr className="my-4" />
            
            <h4 className="mb-4">Booking Settings</h4>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="bookingEnabled"
                name="bookingEnabled"
                label="Enable Bookings"
                checked={formData.bookingEnabled}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                Disable this to temporarily stop accepting new bookings
              </Form.Text>
            </Form.Group>
            
            {!formData.bookingEnabled && (
              <Form.Group className="mb-3">
                <Form.Label>Booking Disabled Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="bookingMessage"
                  value={formData.bookingMessage}
                  onChange={handleInputChange}
                  placeholder="Message to show when bookings are disabled"
                />
              </Form.Group>
            )}
            
            <hr className="my-4" />
            
            <h4 className="mb-4">Maintenance Settings</h4>
            
            <Alert variant="warning">
              <FaLock className="me-2" />
              Enabling maintenance mode will make your site inaccessible to regular visitors. Only administrators will be able to access the site.
            </Alert>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                label="Enable Maintenance Mode"
                checked={formData.maintenanceMode}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            {formData.maintenanceMode && (
              <Form.Group className="mb-3">
                <Form.Label>Maintenance Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="maintenanceMessage"
                  value={formData.maintenanceMessage}
                  onChange={handleInputChange}
                  placeholder="Message to show during maintenance"
                />
              </Form.Group>
            )}
            
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
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="mt-4">
        <Card.Body>
          <h4 className="mb-3">System Status</h4>
          
          <Row>
            <Col md={4} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <FaPowerOff className="mb-3 text-success" size={30} />
                  <h5>System Status</h5>
                  <Badge bg="success">Operational</Badge>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <FaCog className="mb-3 text-primary" size={30} />
                  <h5>Bookings</h5>
                  <Badge bg={formData.bookingEnabled ? 'success' : 'danger'}>
                    {formData.bookingEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <FaLock className="mb-3 text-warning" size={30} />
                  <h5>Maintenance Mode</h5>
                  <Badge bg={formData.maintenanceMode ? 'danger' : 'success'}>
                    {formData.maintenanceMode ? 'On' : 'Off'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Settings