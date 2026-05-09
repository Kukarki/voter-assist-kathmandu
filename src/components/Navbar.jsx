import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { loginWithGoogle, logout, monitorAuthState } from '../authService';

function AppNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = monitorAuthState((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm border-bottom border-primary">
      <Container>
        {/* Brand with Nepal Flag Icon */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center font-weight-bold">
          <span className="me-2">🇳🇵</span> Voter Assist KTM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Main Navigation Links */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/timeline">Election Timeline</Nav.Link>
            <Nav.Link as={Link} to="/polling">Polling Station</Nav.Link>
            <Nav.Link as={Link} to="/faq">Help & FAQ</Nav.Link>
          </Nav>

          <Nav>
            {/* User Authentication Section */}
            {user ? (
              <div className="d-flex align-items-center text-white">
                <div className="me-3 d-none d-md-block text-end">
                  <small className="d-block text-muted">Signed in as</small>
                  <span className="fw-bold">{user.displayName}</span>
                </div>
                {/* Optional: Add user photo if available */}
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="User" 
                    className="rounded-circle me-3" 
                    style={{ width: '35px', height: '35px', border: '2px solid #007bff' }} 
                  />
                )}
                <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button variant="info" size="sm" className="px-4 fw-bold" onClick={loginWithGoogle}>
                Voter Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;