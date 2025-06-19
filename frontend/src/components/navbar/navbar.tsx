import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './navbar.scss';
import logo from '../../assets/baf.png';
import { useAuth } from "../../context/auth_context";
import { AvatarWithArcs } from "../avatar/avatar";
import icon from '../../assets/default-profile-placeholder-mfby2k0rliz1szsn.png'

export interface NavbarProps {
  isLoggedIn?: boolean;
  onToggleSidebar?: () => void;
  onClickLogout?: () => void;
}

export default function NavbarComponent(props?: NavbarProps): React.JSX.Element {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState<number>(10);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

        <div className="d-flex justify-contents-center align-items-center" style={{marginRight: '20px'}}>
          <div style={{ position: 'relative', marginRight: '60px' }}>
            <i className="fa-solid fa-bell" style={{ fontSize: '25px' }}></i>
            { notificationCount ? <Badge
              bg="danger"
              pill
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-20px',
                fontSize: '10em',
                padding: '4px 6px',
              }}
            >
              <span style={{fontSize: '300px'}}>{notificationCount >= 10 ? `9+` : `${notificationCount}`}</span>
            </Badge> : <></>}
          </div>
          
          { !isLoggedIn ? 
            <Button
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              <span>Login</span>
            </Button> : 
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
                <AvatarWithArcs size={60} src={icon} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/profile')}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
      </Container>
    </Navbar>
  );
}