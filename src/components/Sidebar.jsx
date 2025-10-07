import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth

const Sidebar = ({ employee, isOpen }) => {
  const { user } = useAuth(); // <-- Dapatkan informasi user dari context

  // Tampilkan menu Admin jika peran adalah 'admin'
  if (user && user.role === 'admin') {
    return (
      <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <div className="user-profile">
          <h3 className="user-name">Administrator</h3>
        </div>
        <ul className="nav-menu">
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/daftar-pegawai">Daftar Pegawai</NavLink></li>
          {/* Tambahkan baris di bawah ini */}
          <li><NavLink to="/admin/ubah-password">Ubah Password</NavLink></li>
        </ul>
      </aside>
    );
  }

  // Tampilkan menu Pegawai untuk peran lainnya
  const displayName = employee ? employee.name.split(',')[0] : 'Pegawai';
  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="user-profile">
        <h3 className="user-name">{displayName}</h3>
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