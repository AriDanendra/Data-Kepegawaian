import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jika user tidak login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika user login, tampilkan halaman yang diminta
};

export default ProtectedRoute;