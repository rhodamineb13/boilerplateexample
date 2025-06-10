import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './pages/main/main-page';
import TaskPage from './pages/task-page/task-page';
import NotFound from './pages/not-found/not-found';
import {useState, useEffect, useRef} from 'react';
import NavbarComponent from './components/navbar/navbar';
import Login from './pages/login/login';
import RedirectHome from './pages/redirect-home/redirect-home';
import SubmitForm from './pages/submit-form/submit-form';

function App() {
  const currentUser : string = "fasfafafa"
  if (currentUser === "" || currentUser === null) {

  }
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    // Initial measurement
    updateNavbarHeight();
    
    // Add resize listener
    window.addEventListener('resize', updateNavbarHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <>
      <NavbarComponent />
      <div className="inner-body" style={{ minHeight: `calc(100vh - ${navbarHeight}px - 7vh)` }}>
        <Container style={{ maxWidth: 1280, margin: '0 auto', height: "100%" }}>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              currentUser ? <RedirectHome /> : <Navigate to="/login" replace />
            } />
            <Route path="/home" element={
              currentUser ? <MainPage /> : <Navigate to="/login" replace />
            } />
            <Route path="/tasks/:taskId" element={
              currentUser ? <TaskPage /> : <Navigate to="/login" replace />
            } />
            <Route path="/submit-form" element={
              currentUser ? <SubmitForm /> : <Navigate to="/login" replace />
            } />
            
            {/* Catch-all routes */}
            <Route path="*" element={
              currentUser ? <NotFound /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App
