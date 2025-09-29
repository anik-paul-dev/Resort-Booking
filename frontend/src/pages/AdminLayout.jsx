import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Nav, Button } from 'react-bootstrap'
import { FaTachometerAlt, FaBed, FaSwimmingPool, FaStar, FaImages, FaUsers, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [activeNav, setActiveNav] = useState(location.pathname.split('/')[2] || 'dashboard')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin/dashboard' },
    { id: 'rooms', label: 'Rooms', icon: <FaBed />, path: '/admin/rooms' },
    { id: 'features', label: 'Features', icon: <FaStar />, path: '/admin/features' },
    { id: 'facilities', label: 'Facilities', icon: <FaSwimmingPool />, path: '/admin/facilities' },
    { id: 'carousel', label: 'Carousel', icon: <FaImages />, path: '/admin/carousel' },
    { id: 'users', label: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { id: 'reviews', label: 'Reviews', icon: <FaComments />, path: '/admin/reviews' },
    { id: 'queries', label: 'Queries', icon: <FaComments />, path: '/admin/queries' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/admin/settings' }
  ]

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Admin Sidebar */}
        <Col md={3} lg={2} className="admin-sidebar">
          <div className="p-3">
            <h4 className="text-white mb-4">Admin Panel</h4>
            <Nav className="flex-column">
              {adminNavItems.map(item => (
                <Nav.Item key={item.id}>
                  <Nav.Link 
                    className={activeNav === item.id ? 'active' : ''}
                    onClick={() => {
                      setActiveNav(item.id)
                      navigate(item.path)
                    }}
                  >
                    {item.icon} {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item className="mt-auto">
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>
        
        {/* Admin Content */}
        <Col md={9} lg={10} className="admin-content">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {user?.name}</h2>
              <div>
                <span className="badge bg-primary">Administrator</span>
              </div>
            </div>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminLayout