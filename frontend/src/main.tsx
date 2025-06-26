import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth_context.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useScrollToTop } from './hooks/window.tsx';
import * as $ from 'jquery';
import "leaflet/dist/leaflet.css";


(window as any).$ ??= $;
(window as any).jQuery ??= $;

import 'owl.carousel'; // Only after jQuery is globally available


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      
      <AuthProvider>
        <App />
      </AuthProvider>
  </BrowserRouter>,
)
