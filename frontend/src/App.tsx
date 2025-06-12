import { Container, Nav } from 'react-bootstrap'
import { Location, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css'
import MainPage from './pages/main/main-page';
import NotFound from './pages/not-found/not-found';
import NavbarComponent from './components/navbar/navbar';
import Login from './pages/login/login';
import TaskPage from './pages/task-page/task-page';
import logo from "./assets/baf.png"
import LoginPage from './pages/login/login';

function App() {
  const location : Location = useLocation();
  const hideSidebar : boolean = location.pathname === "/login";

  if (hideSidebar) {
    return (
      <div>
        <NavbarComponent />
        <Container fluid className="p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Fixed Sidebar */}
      <div className="sidebar bg-light border-end" style={{
        width: '250px', 
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}>
        <div className="p-3">
          {/* Logo section */}
          <div className="mb-4">
            <img src={logo} width="120px" alt="Logo" className="mb-2" />
          </div>
          
          {/* Navigation Links */}
          <Nav className="flex-column gap-2">
            <Nav.Link href="/home" className="sidebar-link">
              Home
            </Nav.Link>
            <Nav.Link href="/surveyor" className="sidebar-link">
              Surveyor
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content flex-grow-1" style={{marginLeft: '250px'}}>
        {/* Your existing navbar - but simplified since sidebar handles main navigation */}
        <NavbarComponent />
        
        {/* Page Content */}
        <Container fluid className="p-4">
          {/* Your router content goes here */}
          <Routes>
            <Route path="/home" element={<MainPage />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Navigate replace to="/login" />}/> 
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App
