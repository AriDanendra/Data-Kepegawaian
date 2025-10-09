// src/context/AuthContext.jsx (Diperbarui dengan fungsi updateUser)

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import allEmployees, { adminUser } from '../_mock';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === adminUser.username && password === adminUser.password) {
      setUser(adminUser);
      navigate('/admin');
      return;
    }
    const foundEmployee = allEmployees.find(emp => emp.nip.includes(username));
    if (foundEmployee && password === foundEmployee.password) {
      setUser({ ...foundEmployee, role: 'pegawai' });
      navigate('/');
    } else {
      alert('Username atau Password salah!');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  // Ditambahkan: Fungsi untuk memperbarui data user di state context
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
    updateUser, // Ditambahkan: Sertakan fungsi updateUser di dalam value context
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