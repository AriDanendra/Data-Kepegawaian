import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Jika belum login, selalu redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika sudah login, periksa apakah perannya diizinkan
  if (!allowedRoles.includes(user.role)) {
    // Jika tidak diizinkan (misal: pegawai coba akses /admin),
    // redirect juga ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika login dan peran diizinkan, tampilkan halamannya
  return children;
};

export default ProtectedRoute;