import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainPage from './pages/main/main-page';
import NotFound from './pages/not-found/not-found';
import NavbarComponent from './components/navbar/navbar';
import LoginPage from './pages/login/login';
import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import TaskPage from './pages/task-page/task-page';
import { ProtectedRoute } from './routes/protected_route';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ProfilePage } from './pages/profile/profile';
import { useScrollToTop } from './hooks/window';
import 'owl.carousel/dist/assets/owl.carousel.css'; {/* this line */}
import 'owl.carousel/dist/assets/owl.theme.default.css';import { SurveyorPage } from './pages/surveyor/surveyor';
 {/* this line */}




function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  const [toggleCollapseSidebar, setToggleCollapseSidebar] = useState<boolean>(false);
  const [windowCollapseSidebar, setWindowCollapseSidebar] = useState<boolean>(false);

  const handleToggleCollapseSidebar = () => {
    setToggleCollapseSidebar(prev => !prev);
  };


  useEffect(() => {
      const handleResize = () => {
        setWindowCollapseSidebar(window.innerWidth < 700);
      };
      
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize)
  })

  useScrollToTop()

  const combinedLogicCollapseSidebar : boolean = toggleCollapseSidebar || windowCollapseSidebar

  return (
      <div className="app-container">
        <NavbarComponent onToggleSidebar={handleToggleCollapseSidebar} />

        {!hideSidebar && <Sidebar collapsed={combinedLogicCollapseSidebar} />}

        <div
          className="main-content flex-grow-1"
          style={{
            marginLeft: hideSidebar ? '0' : (combinedLogicCollapseSidebar ? '60px' : '250px'),
            transition: 'margin-left 0.3s ease'
          }}
        >
          
          <Container fluid className="p-4">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<MainPage />} />
                <Route path='/' element={<Navigate to={'/home'} />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/surveyors' element={<SurveyorPage />}/>
              </Route>
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Container>
        </div>
      </div>
  );
}

export default App;
