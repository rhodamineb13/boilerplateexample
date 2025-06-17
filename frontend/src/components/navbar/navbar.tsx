import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './navbar.scss';
import logo from '../../assets/baf.png';
import { useAuth } from "../../context/auth_context";

export interface NavbarProps {
  isLoggedIn?: boolean;
  onToggleSidebar?: () => void;
  onClickLogout?: () => void;
}

export default function NavbarComponent(props?: NavbarProps): React.JSX.Element {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar" sticky="top">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            <img src={logo} height={40} alt="logo" />
          </Navbar.Brand>

          <Button
            variant="link"
            className="p-0 burger-btn"
            onClick={props?.onToggleSidebar}
          >
            <i className="fa-solid fa-bars fa-lg"></i>
          </Button>
        </div>

        <div>
          <Button
            className="login-btn"
            onClick={() => (isLoggedIn ? logout() : navigate('/login'))}
          >
            <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
