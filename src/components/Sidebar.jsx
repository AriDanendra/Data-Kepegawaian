// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// MODIFIKASI: Terima prop `toggleSidebar`
const Sidebar = ({ employee, isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  // Tampilan menu Admin
  if (user && user.role === 'admin') {
    return (
      <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <div className="user-profile">
          <h3 className="user-name">Administrator</h3>
          {/* TOMBOL TUTUP DITAMBAHKAN DI SINI */}
          <button onClick={toggleSidebar} className="sidebar-close-btn">&times;</button>
        </div>
        <ul className="nav-menu">
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/daftar-pegawai">Daftar Pegawai</NavLink></li>
          <li><NavLink to="/admin/ubah-password">Ubah Password</NavLink></li>
        </ul>
      </aside>
    );
  }

  // Tampilan menu Pegawai
  const displayName = employee ? employee.name.split(',')[0] : 'Pegawai';
  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="user-profile">
        <h3 className="user-name">{displayName}</h3>
        {/* TOMBOL TUTUP DITAMBAHKAN DI SINI JUGA */}
        <button onClick={toggleSidebar} className="sidebar-close-btn">&times;</button>
      </div>
      <ul className="nav-menu">
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/pemberitahuan">Pemberitahuan</NavLink></li>
        <li><NavLink to="/ubah-password">Ubah Password</NavLink></li>
      </ul>
    </aside>
  );
};

export default Sidebar;