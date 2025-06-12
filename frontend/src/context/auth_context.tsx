// context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { client } from '../api/api_client';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      const response = await client.get('/api/me', { withCredentials: true });
      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await client.post('/api/logout', {}, { withCredentials: true });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};