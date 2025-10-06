import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

const Sidebar = ({ employee, isOpen }) => {
  const displayName = employee.name.split(',')[0];

  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="user-profile">
        <h3 className="user-name">{displayName}</h3>
      </div>
      <ul className="nav-menu">
        {/* Gunakan NavLink untuk routing */}
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/pemberitahuan">Pemberitahuan</NavLink></li>
        <li><NavLink to="/ubah-password">Ubah Password</NavLink></li>
      </ul>
      <div className="sidebar-footer">
      </div>
    </aside>
  );
};

export default Sidebar;