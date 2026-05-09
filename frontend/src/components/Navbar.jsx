import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { loginWithGoogle, logout, monitorAuthState } from '../authService';
import { useTranslation } from 'react-i18next'; // 1. Import translation hook

function AppNavbar() {
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation(); // 2. Initialize translation

  useEffect(() => {
    const unsubscribe = monitorAuthState((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to handle language switching
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm border-bottom border-primary">
      <Container>
        {/* Brand with Nepal Flag Icon */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center font-weight-bold">
          <span className="me-2">🇳🇵</span> {t('hero_title')}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Main Navigation Links - Using t() for multi-language */}
            <Nav.Link as={Link} to="/">{t('navbar_home')}</Nav.Link>
            <Nav.Link as={Link} to="/timeline">{t('navbar_timeline') || 'Timeline'}</Nav.Link>
            <Nav.Link as={Link} to="/polling">{t('navbar_polling')}</Nav.Link>
            <Nav.Link as={Link} to="/faq">{t('navbar_faq')}</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {/* 3. Language Selector Dropdown */}
            <NavDropdown 
              title={i18n.language === 'en' ? '🇺🇸 EN' : '🇳🇵 ने'} 
              id="language-dropdown" 
              className="me-3"
            >
              <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('ne')}>नेपाली</NavDropdown.Item>
            </NavDropdown>

            {/* User Authentication Section */}
            {user ? (
              <div className="d-flex align-items-center text-white">
                <div className="me-3 d-none d-md-block text-end">
                  <small className="d-block text-muted">{t('signed_in_as') || 'Signed in as'}</small>
                  <span className="fw-bold">{user.displayName}</span>
                </div>
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="User" 
                    className="rounded-circle me-3" 
                    style={{ width: '35px', height: '35px', border: '2px solid #007bff' }} 
                  />
                )}
                <Button variant="outline-danger" size="sm" onClick={logout}>{t('logout') || 'Logout'}</Button>
              </div>
            ) : (
              <Button variant="info" size="sm" className="px-4 fw-bold" onClick={loginWithGoogle}>
                {t('voter_login') || 'Voter Login'}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;