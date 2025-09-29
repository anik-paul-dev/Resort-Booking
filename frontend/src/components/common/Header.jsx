import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser, FaSignOutAlt, FaHotel, FaBars } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleNavbar = () => {
    setExpanded(!expanded)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHotel className="me-2" /> Asian Resort
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}>
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/rooms" onClick={() => setExpanded(false)}>Rooms</Nav.Link>
            <Nav.Link as={Link} to="/facilities" onClick={() => setExpanded(false)}>Facilities</Nav.Link>
            <Nav.Link as={Link} to="/features" onClick={() => setExpanded(false)}>Features</Nav.Link>
            <Nav.Link as={Link} to="/menu" onClick={() => setExpanded(false)}>Menu & Packages</Nav.Link>
            <Nav.Link as={Link} to="/availability" onClick={() => setExpanded(false)}>Availability</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={<><FaUser className="me-1" /> {user.name}</>} id="basic-nav-dropdown">
                {user.role === 'admin' ? (
                  <NavDropdown.Item as={Link} to="/admin/dashboard" onClick={() => setExpanded(false)}>
                    Admin Dashboard
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/user/dashboard" onClick={() => setExpanded(false)}>
                    My Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-1" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header