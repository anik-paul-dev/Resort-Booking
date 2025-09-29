import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Nav, Button } from 'react-bootstrap'
import { FaTachometerAlt, FaUser, FaHotel, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

const UserLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [activeNav, setActiveNav] = useState(location.pathname.split('/')[2] || 'dashboard')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/user/dashboard' },
    { id: 'profile', label: 'My Profile', icon: <FaUser />, path: '/user/profile' },
    { id: 'bookings', label: 'My Bookings', icon: <FaHotel />, path: '/user/bookings' },
    { id: 'reviews', label: 'My Reviews', icon: <FaFileAlt />, path: '/user/reviews' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/user/settings' }
  ]

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* User Sidebar */}
        <Col md={3} lg={2} className="user-sidebar">
          <div className="p-3">
            <h4 className="text-white mb-4">My Account</h4>
            <Nav className="flex-column">
              {userNavItems.map(item => (
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
        
        {/* User Content */}
        <Col md={9} lg={10} className="user-content">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {user?.name}</h2>
              <div>
                <span className="badge bg-primary">Guest</span>
              </div>
            </div>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UserLayout