// frontend/src/pages/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaTachometerAlt, FaBed, FaSwimmingPool, FaStar, FaImages, FaUsers, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');

  // Update activeNav based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentSection = pathSegments[2] || 'dashboard';
    setActiveNav(currentSection);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin/dashboard' },
    { id: 'rooms', label: 'Rooms', icon: <FaBed />, path: '/admin/rooms' },
    { id: 'features', label: 'Features', icon: <FaStar />, path: '/admin/features' },
    { id: 'facilities', label: 'Facilities', icon: <FaSwimmingPool />, path: '/admin/facilities' },
    { id: 'carousel', label: 'Carousel', icon: <FaImages />, path: '/admin/carousel' },
    { id: 'users', label: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { id: 'reviews', label: 'Reviews', icon: <FaComments />, path: '/admin/reviews' },
    { id: 'queries', label: 'Queries', icon: <FaComments />, path: '/admin/queries' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  return (
    <Container fluid className="p-0 admin-container">
      <Row className="g-0 min-vh-100">
        {/* Admin Sidebar */}
        <Col xs={12} md={3} lg={2} className="admin-sidebar bg-dark">
          <div className="p-3">
            <h4 className="text-white mb-4">Admin Panel</h4>
            <Nav className="flex-column">
              {adminNavItems.map((item) => (
                <Nav.Item key={item.id}>
                  <Nav.Link
                    className={`text-white ${activeNav === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveNav(item.id);
                      navigate(item.path);
                    }}
                  >
                    {item.icon} <span className="ms-2">{item.label}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item className="mt-auto">
                <Nav.Link onClick={handleLogout} className="text-white">
                  <FaSignOutAlt /> <span className="ms-2">Logout</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>

        {/* Admin Content */}
        <Col xs={12} md={9} lg={10} className="admin-content">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {user?.name || 'Admin'}</h2>
              <div>
                <span className="badge bg-primary">Administrator</span>
              </div>
            </div>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;