// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };
// const mname = user?.user.name;
  return (
    <>
    {/* <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">ITT</Link>
        <div className="d-flex" style={{}}>
          {user ? (
            <>
              <div>
                <Link className="btn btn-outline-primary me-2" to="/dashboard">
                  Dashboard
                </Link>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-secondary" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header> */}

    <Navbar bg="primary" variant="dark" expand="lg" className="mb-1">
    <Container fluid>
      <Navbar.Brand href="/">ITT </Navbar.Brand>
      <Nav className="ml-auto">
        {user ? (
            <>
            {/* <Nav.Link as={Link} to="/dashboard" className="text-white">Dashboard</Nav.Link> */}
            <Nav.Link href="#notifications" className="text-white">Notifications</Nav.Link>
            <NavDropdown title={user?.user?.name || 'User'} id="user-dropdown" align="end">
              <NavDropdown.Item>
                <Link to="/profile">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item  to="/logout" onClick={handleLogout}>Logout</NavDropdown.Item>
              {/* <NavDropdown.Item>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              </NavDropdown.Item> */}
            </NavDropdown>
            </>
          ) : (
            <>
            <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
            </>
          )}


        
      </Nav>
    </Container>
    </Navbar>
    </>
  );
};

export default Header;
