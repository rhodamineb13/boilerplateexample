import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './navbar.scss';

export default function NavbarComponent() : React.JSX.Element {
    const navigate = useNavigate();

    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mobile-toggle" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link>
                    <Button variant="primary" className="login-btn" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                  </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      </>
    );
}