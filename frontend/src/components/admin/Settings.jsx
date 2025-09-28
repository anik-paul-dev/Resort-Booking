import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { fetchSettings, updateSettings } from '../../services/api';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    siteName: '',
    logo: '',
    favicon: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    isMaintenanceMode: false,
    maintenanceMessage: '',
    isBookingPaused: false,
    bookingPauseMessage: '',
    currency: 'USD',
    taxRate: 0,
    bookingPolicy: '',
    cancellationPolicy: '',
    paymentMethods: {
      credit_card: true,
      debit_card: true,
      paypal: true,
      bank_transfer: true,
    },
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await fetchSettings();
        setSettings(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to load settings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [field]: value,
        },
      }));
    } else if (name.startsWith('paymentMethods.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        paymentMethods: {
          ...prev.paymentMethods,
          [field]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleLogoUpload = (e) => {
    // This would be implemented with Cloudinary upload
    console.log('Logo upload:', e.target.files);
  };

  const handleFaviconUpload = (e) => {
    // This would be implemented with Cloudinary upload
    console.log('Favicon upload:', e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      await updateSettings(formData);
      setSuccess(true);
      // Reload settings
      const response = await fetchSettings();
      setSettings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings.');
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading settings...</div>;
  }

  return (
    <div>
      <h1 className="mb-4">Website Settings</h1>
      
      {success && (
        <Alert variant="success">
          Settings updated successfully!
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>General Settings</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  {formData.logo && (
                    <div className="mt-2">
                      <img src={formData.logo} alt="Logo" className="img-thumbnail" style={{ maxHeight: '100px' }} />
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Favicon</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFaviconUpload}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Form.Select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="CNY">Chinese Yuan (CNY)</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tax Rate (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Contact Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="contactAddress"
                    value={formData.contactAddress}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </Form.Group>
                
                <Card.Title className="mt-4">Social Media</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type="text"
                    name="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>YouTube</Form.Label>
                  <Form.Control
                    type="text"
                    name="socialMedia.youtube"
                    value={formData.socialMedia.youtube}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Website Status</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isMaintenanceMode"
                    label="Maintenance Mode"
                    checked={formData.isMaintenanceMode}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    When enabled, the website will show a maintenance message to all visitors except administrators.
                  </Form.Text>
                </Form.Group>
                
                {formData.isMaintenanceMode && (
                  <Form.Group className="mb-3">
                    <Form.Label>Maintenance Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="maintenanceMessage"
                      value={formData.maintenanceMessage}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </Form.Group>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isBookingPaused"
                    label="Pause Bookings"
                    checked={formData.isBookingPaused}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    When enabled, users will not be able to make new bookings.
                  </Form.Text>
                </Form.Group>
                
                {formData.isBookingPaused && (
                  <Form.Group className="mb-3">
                    <Form.Label>Booking Pause Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bookingPauseMessage"
                      value={formData.bookingPauseMessage}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Policies</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Booking Policy</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bookingPolicy"
                    value={formData.bookingPolicy}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Cancellation Policy</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Payment Methods</Card.Title>
            
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="paymentMethods.credit_card"
                    label="Credit Card"
                    checked={formData.paymentMethods.credit_card}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="paymentMethods.debit_card"
                    label="Debit Card"
                    checked={formData.paymentMethods.debit_card}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="paymentMethods.paypal"
                    label="PayPal"
                    checked={formData.paymentMethods.paypal}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="paymentMethods.bank_transfer"
                    label="Bank Transfer"
                    checked={formData.paymentMethods.bank_transfer}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;