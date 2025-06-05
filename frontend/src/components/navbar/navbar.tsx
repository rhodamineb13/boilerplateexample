import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/baf.avif'
import './navbar.scss';

export default function NavbarComponent() : React.JSX.Element {
    const navigate = useNavigate();

    return (
      <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} width={'80px'} alt="Logo" />
          </Navbar.Brand>
          
          {/* Mobile-only elements */}
          <div className="mobile-right d-lg-none" style={{marginRight: '30px'}}>
            <Nav.Link href="/notifications" className="mobile-icon">
              <i className="fa-solid fa-bell"></i>
            </Nav.Link>
          </div>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mobile-toggle" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/submit-form">Submit Form</Nav.Link>
            </Nav>
            <Nav className="right-nav align-items-center gap-5 d-none d-lg-flex">
              <Nav.Link href="/notifications">
                <i className="fa-solid fa-bell"></i>
              </Nav.Link>
              <Nav.Link href="/login" className="d-flex align-items-center">
                <Button variant="primary" className="login-btn">
                  Login
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}