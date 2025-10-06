import React from 'react';

const Header = ({ toggleSidebar }) => {
  // Fungsi ini bisa Anda ganti dengan logika logout yang sebenarnya
  const handleLogout = () => {
    alert('Tombol Logout diklik!');
    // Contoh: panggil fungsi logout dari context, redirect, dll.
  };

  return (
    <header className="header">
      {/* Tombol toggle sidebar di kiri */}
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">
        ☰
      </button>
      
      <h1>
        Sistem Informasi Manajemen Kepegawian RS dr. Hasri Ainun Habibie
      </h1>

      {/* Tombol Logout baru di kanan */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </header>
  );
};

export default Header;