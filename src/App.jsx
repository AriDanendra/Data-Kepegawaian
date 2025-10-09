// src/App.jsx (Kode yang Sudah Diperbaiki untuk Detail Page)

import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

// 1. Impor data pegawai dari _mock.jsx
import { loggedInEmployee } from './_mock'; 

// Context dan Halaman Login
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Komponen Layout Utama
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Halaman Pegawai (Impor komponen lainnya tetap sama)
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/ProfilePage';
import RiwayatJabatan from './pages/profile/RiwayatJabatan';
import DataKeluarga from './pages/profile/DataKeluarga';
import StatusKepegawaian from './pages/profile/StatusKepegawaian';
import DataKGB from './pages/profile/DataKGB';
import RiwayatPendidikan from './pages/profile/RiwayatPendidikan';
import RiwayatDiklat from './pages/profile/RiwayatDiklat';
import RiwayatPenghargaan from './pages/profile/RiwayatPenghargaan';
import RiwayatCuti from './pages/profile/RiwayatCuti';
import RiwayatOrganisasi from './pages/profile/RiwayatOrganisasi';
import RiwayatSKP from './pages/profile/RiwayatSKP';
import RiwayatSKPPermenpan from './pages/profile/RiwayatSKPPermenpan';
import RiwayatHukuman from './pages/profile/RiwayatHukuman';
import Pemberitahuan from './Pages/Pemberitahuan';
import UbahPassword from './Pages/UbahPassword';

// Halaman Admin
import AdminDashboard from './Pages/admin/AdminDashboard';
import DaftarPegawai from './Pages/admin/DaftarPegawai';
// === TAMBAHKAN IMPORT KOMPONEN HALAMAN DETAIL BARU DI SINI ===
import PegawaiDetailPage from './Pages/admin/PegawaiDetailPage'; 
// =============================================================

// 2. Hapus 'const employeeData' dari sini (Sudah dihapus)

const MainLayout = ({ employee }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(window.innerWidth > 768);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  React.useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-body-container">
        <Sidebar employee={employee} isOpen={isSidebarOpen} />
        <div className="content-wrapper">
          <main className="main-content">
            <Outlet />
          </main>
          <footer className="footer">Tahun 2025</footer>
          
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* === RUTE UNTUK PEGAWAI === */}
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={['pegawai']}>
                {/* 3. Gunakan 'loggedInEmployee' sebagai prop */}
                <MainLayout employee={loggedInEmployee} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard employee={loggedInEmployee} />} />
            {/* Riwayat Pegawai (Nested Routes) */}
            <Route path="profile" element={<ProfilePage employee={loggedInEmployee} />}>
                <Route index element={<div style={{textAlign: 'center', padding: '2rem', color: '#6c757d'}}><p>Silakan pilih menu di atas untuk melihat detail riwayat.</p></div>} />
                <Route path="jabatan" element={<RiwayatJabatan />} />
                <Route path="keluarga" element={<DataKeluarga />} />
                <Route path="status" element={<StatusKepegawaian />} />
                <Route path="kgb" element={<DataKGB />} />
                <Route path="pendidikan" element={<RiwayatPendidikan />} />
                <Route path="diklat" element={<RiwayatDiklat />} />
                <Route path="penghargaan" element={<RiwayatPenghargaan />} />
                <Route path="cuti" element={<RiwayatCuti />} />
                <Route path="organisasi" element={<RiwayatOrganisasi />} />
                <Route path="skp" element={<RiwayatSKP />} />
                <Route path="skp-permenpan" element={<RiwayatSKPPermenpan />} />
                <Route path="hukuman" element={<RiwayatHukuman />} />
            </Route>
            <Route path="pemberitahuan" element={<Pemberitahuan />} />
            <Route path="ubah-password" element={<UbahPassword />} />
          </Route>

          {/* === RUTE UNTUK ADMIN === */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                {/* Untuk Admin, Sidebar tidak perlu data 'employee' kecuali untuk tampilan profil sendiri */}
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="daftar-pegawai" element={<DaftarPegawai />} />
            {/* === TAMBAHKAN ROUTE DETAIL PEGAWAI DI SINI === */}
            <Route path="pegawai/detail/:employeeId" element={<PegawaiDetailPage />} />
            {/* ============================================= */}
            <Route path="ubah-password" element={<UbahPassword />} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;