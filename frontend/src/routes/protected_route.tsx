import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth_context';

export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or show a spinner

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};