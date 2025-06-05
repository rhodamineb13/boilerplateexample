import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './pages/main/main-page';
import Browse from './pages/browse/browse';
import About from './pages/about/about';
import TaskPage from './pages/task-page/task-page';
import NotFound from './pages/not-found/not-found';
import {useState, useEffect, useRef} from 'react';
import NavbarComponent from './components/navbar/navbar';
import Login from './pages/login/login';
import RedirectHome from './pages/redirect-home/redirect-home';
import SubmitForm from './pages/submit-form/submit-form';

function App() {
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

  return (<>
    <NavbarComponent />
    <div className="inner-body" style={{
      minHeight: `calc(100vh - ${navbarHeight}px - 7vh)`,
    }}>
      <Container style={{ maxWidth: 1280, margin: '0 auto', height: "100%" }}>
        <Routes>
        <Route path="/" element={<RedirectHome/>}/>
        <Route path="/home" element={<MainPage/>}/>
        <Route path="/tasks/:taskId" element={<TaskPage/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/submit-form" element={<SubmitForm/>}/>
        </Routes>
      </Container>
    </div>
    </>
  )
}

export default App
