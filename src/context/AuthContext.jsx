import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Ubah state untuk menyimpan objek user (termasuk peran/role)
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const login = (username, password) => {
    // Logika untuk membedakan admin dan pegawai
    if (username === 'admin' && password === 'password') {
      setUser({ role: 'admin' }); // Simpan peran sebagai admin
      navigate('/admin'); // Arahkan ke dashboard admin
    } else if (username === 'pegawai' && password === 'password') {
      setUser({ role: 'pegawai' }); // Simpan peran sebagai pegawai
      navigate('/'); // Arahkan ke dashboard pegawai
    } else {
      alert('Username atau Password salah!');
    }
  };

  const logout = () => {
    setUser(null); // Hapus data user saat logout
    navigate('/login');
  };

  const value = {
    isAuthenticated: !!user, // Bernilai true jika ada user, false jika null
    user, // Kirim data user (termasuk role) ke komponen lain
    login,
    logout
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