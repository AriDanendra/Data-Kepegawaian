// src/pages/Dashboard.jsx (Disesuaikan)

import React from 'react';
import { useAuth } from '../context/AuthContext'; // Ditambahkan: Import useAuth

// Diubah: Hapus 'employee' dari props
const Dashboard = () => {
  // Ditambahkan: Ambil data user yang sedang login dari context
  const { user } = useAuth();

  // Ditambahkan: Pengaman jika data user belum termuat
  if (!user) {
    return <main className="main-content">Memuat data pengguna...</main>;
  }
  
  // Perbaikan: Logika untuk menampilkan gambar yang sudah diunggah
  const profileImageUrl = user.profilePictureUrl && user.profilePictureUrl.startsWith('/public')
    ? `http://localhost:3001${user.profilePictureUrl}`
    : user.profilePictureUrl || "/assets/profile-pic.jpg";


  return (
    <main className="main-content">
      <div className="welcome-header">
        <h2>Selamat Datang</h2>
        <p className="app-subtitle">
          Sistem Informasi Manajemen Kepegawaian Rumah Sakit Regional dr. Hasri Ainun Habibie
        </p>
        <p className="description">
          Aplikasi ini dirancang untuk mengelola data kepegawaian secara efisien dan terpusat.
        </p>
      </div>

      <div className="profile-card">
        {/* Diubah: Gunakan profileImageUrl */}
        <img src={profileImageUrl} alt="Foto Profil Pegawai" className="profile-picture" />
        <div className="profile-data">
          {/* Diubah: Semua 'employee' diganti menjadi 'user' */}
          <h3 className="employee-name">Selamat Datang, {user.name.toUpperCase()}</h3>
          <table>
            <tbody>
              <tr>
                <td>NIP</td>
                <td>: {user.nip}</td>
              </tr>
              <tr>
                <td>Tempat/Tgl Lahir</td>
                <td>: {user.ttl}</td>
              </tr>
              <tr>
                <td>Agama</td>
                <td>: {user.agama}</td>
              </tr>
              <tr>
                <td>Suku</td>
                <td>: {user.suku}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>: {user.alamat}</td>
              </tr>
              <tr><td colSpan="2">&nbsp;</td></tr>
              <tr>
                <td colSpan="2">{user.pendidikan}</td>
              </tr>
              <tr>
                <td colSpan="2">{user.golongan}</td>
              </tr>
              <tr><td colSpan="2">&nbsp;</td></tr>
              <tr>
                <td>No.Hp/Telp</td>
                <td>: {user.nomorHp}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: {user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;