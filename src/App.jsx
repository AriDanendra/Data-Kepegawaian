import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard'; 
import ProfilePage from './Pages/ProfilePage';

// Import komponen untuk child routes di halaman profil
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
// (Tambahkan import untuk halaman riwayat lainnya di sini)

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Objek data pegawai yang sudah lengkap
  const employeeData = {
    name: 'Edwin Zhoker',
    nip: '010229725 / 198804011990032010',
    ttl: 'Parepare, 01-04-1988',
    agama: 'ISLAM',
    suku: '-',
    alamat: 'Jl. Mattiro Jompi No. 5',
    pendidikan: 'S.2 - MANAJEMEN PEMBANGUNAN DAERAH',
    golongan: 'PEMBINA (IVa)',
    // --- Tambahkan data baru di sini ---
    jabatan: 'Kepala Bagian Ketatausahaan, Humas dan Hukum',
    instansi: 'UPT RUMAH SAKIT DR. HASRI AINUN HABIBIE',
    // ------------------------------------
    nomorHp: '08114225580',
    email: 'edwinzhoker@gmail.com'
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-body-container">
          <Sidebar employee={employeeData} isOpen={isSidebarOpen} />
          
          <div className="content-wrapper">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard employee={employeeData} />} 
              />
              
              {/* --- Konfigurasi Nested Routing untuk Halaman Profil --- */}
              <Route 
                path="/profile" 
                element={<ProfilePage employee={employeeData} />}
              >
                {/* Rute default saat membuka /profile */}
                <Route index element={
                  <div style={{textAlign: 'center', padding: '2rem', color: '#6c757d'}}>
                    <p>Silakan pilih menu di atas untuk melihat detail riwayat.</p>
                  </div>
                } />

                {/* Rute anak untuk setiap menu */}
                <Route path="jabatan" element={<RiwayatJabatan />} />
                <Route path="keluarga" element={<DataKeluarga />} />
                <Route path="status" element={<StatusKepegawaian />} />
                <Route path="keluarga" element={<DataKeluarga />} />
                <Route path="jabatan" element={<RiwayatJabatan />} />
                <Route path="kgb" element={<DataKGB />} />
                <Route path="pendidikan" element={<RiwayatPendidikan />} />
                <Route path="diklat" element={<RiwayatDiklat />} />
                <Route path="penghargaan" element={<RiwayatPenghargaan />} />
                <Route path="cuti" element={<RiwayatCuti />} />
                <Route path="organisasi" element={<RiwayatOrganisasi />} />
                <Route path="skp" element={<RiwayatSKP />} />
                <Route path="skp-permenpan" element={<RiwayatSKPPermenpan />} />
                <Route path="hukuman" element={<RiwayatHukuman />} />
                {/* <Route path="status" element={<StatusKepegawaian />} /> */}
                {/* (Tambahkan rute untuk menu lainnya di sini) */}

              </Route>

            </Routes>
            
            <footer className="footer">
              Tahun 2025
            </footer>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;