// src/context/AuthContext.jsx (Perubahan untuk tidak menggunakan alert)

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    // try-catch dipindahkan ke komponen LoginPage agar bisa mengontrol state modal
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.user);
      localStorage.setItem('token', data.token);

      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      // Melemparkan error agar bisa ditangkap oleh komponen LoginPage
      throw new Error(data.message || 'Username atau Password salah!');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};