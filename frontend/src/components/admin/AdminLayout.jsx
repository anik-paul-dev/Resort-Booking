import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBed, FaUsers, FaStar, FaSwimmingPool, FaImages, FaQuestionCircle, FaCommentAlt, FaCog } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const adminLinks = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/rooms', icon: <FaBed />, label: 'Manage Rooms' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Manage Users' },
    { path: '/admin/features', icon: <FaStar />, label: 'Manage Features' },
    { path: '/admin/facilities', icon: <FaSwimmingPool />, label: 'Manage Facilities' },
    { path: '/admin/carousel', icon: <FaImages />, label: 'Manage Carousel' },
    { path: '/admin/queries', icon: <FaQuestionCircle />, label: 'Manage Queries' },
    { path: '/admin/reviews', icon: <FaCommentAlt />, label: 'Manage Reviews' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <Row>
          <Col md={3} className="admin-sidebar p-0">
            <Nav className="flex-column">
              {adminLinks.map(link => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  <span className="me-2">{link.icon}</span>
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={9} className="admin-content p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;