import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
import { FaUser, FaSignOutAlt, FaHotel, FaBars } from 'react-icons/fa';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { settings } = useApp();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <header className="header">
      <Navbar expand="lg" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            {settings?.logo ? (
              <img 
                src={settings.logo} 
                alt={settings?.siteName || 'Resort Booking'} 
                height="30" 
                className="d-inline-block align-top"
              />
            ) : (
              <FaHotel className="me-2" />
            )}
            {settings?.siteName || 'Resort Booking'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
              <Nav.Link as={Link} to="/rooms" onClick={handleLinkClick}>Rooms</Nav.Link>
              <Nav.Link as={Link} to="/features" onClick={handleLinkClick}>Features</Nav.Link>
              <Nav.Link as={Link} to="/facilities" onClick={handleLinkClick}>Facilities</Nav.Link>
              <Nav.Link as={Link} to="/room-availability" onClick={handleLinkClick}>Availability</Nav.Link>
              <Nav.Link as={Link} to="/menu-packages" onClick={handleLinkClick}>Menu & Packages</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>Contact</Nav.Link>
              
              {isAuthenticated ? (
                <NavDropdown title={<><FaUser className="me-1" /> {user.name}</>} id="basic-nav-dropdown">
                  {isAdmin && (
                    <>
                      <NavDropdown.Item as={Link} to="/admin" onClick={handleLinkClick}>Admin Dashboard</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                  <NavDropdown.Item as={Link} to="/user" onClick={handleLinkClick}>My Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user/profile" onClick={handleLinkClick}>Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user/bookings" onClick={handleLinkClick}>My Bookings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" onClick={handleLinkClick}>Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;