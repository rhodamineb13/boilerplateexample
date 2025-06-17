// context/auth_context.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { client } from '../api/api_client';

interface AuthContextType {
  isLoggedIn?: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // <-- Add this

  useEffect(() => {
    client.get('/api/me', { withCredentials: true })
      .then(res => {
        setisLoggedIn(res.data.authenticated);
      })
      .catch(() => setisLoggedIn(false))
      .finally(() => setLoading(false)); // <-- Indicate that check is done
  }, []);

  const login = async (username: string, password: string) => {
    const res = await client.post('/login', {
      username: username,
      password: password
    });
    if (res.status < 200 || res.status >= 400) throw new Error('Login failed');
    setisLoggedIn(true);
  };

  const logout = async () => {
    // Set to false immediately to prevent race conditions
    setisLoggedIn(false);
    try {
      await client.post('/api/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};