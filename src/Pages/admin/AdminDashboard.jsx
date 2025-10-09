// src/pages/admin/AdminDashboard.jsx (Diperbarui)

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import allEmployees from '../../_mock';
// Dihapus: FaUserShield tidak lagi digunakan
// import { FaUserShield } from 'react-icons/fa'; 

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalPegawai: 0,
    pegawaiAktif: 0,
  });

  useEffect(() => {
    const total = allEmployees.length;
    setStats({
      totalPegawai: total,
      pegawaiAktif: total,
    });
  }, []);

  if (!user) {
    return <main className="main-content">Memuat data...</main>;
  }

  return (
    <main className="main-content">
      <div className="welcome-header">
        <h2>Dashboard Administrator</h2>
        <p className="app-subtitle">
          Sistem Informasi Manajemen Kepegawaian Rumah Sakit Regional dr. Hasri Ainun Habibie
        </p>
        <p className="description">
          Selamat datang di panel kontrol. Kelola data dan monitor statistik kepegawaian.
        </p>
      </div>

      <div className="profile-card">
        {/* Diubah: Mengganti ikon dengan <img> untuk foto profil */}
        <img 
          src="/assets/profile-pic.jpg" 
          alt="Foto Profil Admin" 
          className="profile-picture" 
        />
        
        <div className="profile-data">
          <h3 className="employee-name">Selamat Datang, {user.name}</h3>
          
          <table>
            <tbody>
              <tr>
                <td>Status Akun</td>
                <td>: Administrator Sistem</td>
              </tr>
              <tr>
                <td>Total Pegawai Terdata</td>
                <td>: {stats.totalPegawai} Orang</td>
              </tr>
               <tr>
                <td>Pegawai Aktif</td>
                <td>: {stats.pegawaiAktif} Orang</td>
              </tr>
              <tr><td colSpan="2">&nbsp;</td></tr>
              <tr>
                <td colSpan="2">
                  Gunakan menu navigasi di samping untuk mengelola data pegawai, 
                  melihat detail, dan melakukan manajemen data lainnya.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;