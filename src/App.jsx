import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

// Context dan Halaman Login
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Komponen Layout Utama
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Halaman-halaman Aplikasi
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

const employeeData = {
  name: 'Edwin Zhoker',
  nip: '010229725 / 198804011990032010',
  ttl: 'Parepare, 01-04-1988',
  agama: 'ISLAM',
  suku: '-',
  alamat: 'Jl. Mattiro Jompi No. 5',
  pendidikan: 'S.2 - MANAJEMEN PEMBANGUNAN DAERAH',
  golongan: 'PEMBINA (IVa)',
  jabatan: 'Kepala Bagian Ketatausahaan, Humas dan Hukum',
  instansi: 'UPT RUMAH SAKIT DR. HASRI AINUN HABIBIE',
  nomorHp: '08114225580',
  email: 'edwinzhoker@gmail.com'
};

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  React.useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-body-container">
        <Sidebar employee={employeeData} isOpen={isSidebarOpen} />
        <div className="content-wrapper">
          <main className="main-content">
            <Outlet />
          </main>
          <footer className="footer">
            Tahun 2025
          </footer>
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
          {/* Rute publik untuk halaman login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rute yang dilindungi dan menggunakan MainLayout sebagai pembungkus */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Rute-rute ini akan dirender di dalam <Outlet> MainLayout */}
            <Route index element={<Dashboard employee={employeeData} />} />
            <Route path="pemberitahuan" element={<Pemberitahuan />} />
            <Route path="ubah-password" element={<UbahPassword />} />
            <Route path="profile" element={<ProfilePage employee={employeeData} />}>
              <Route index element={
                  <div style={{textAlign: 'center', padding: '2rem', color: '#6c757d'}}>
                    <p>Silakan pilih menu di atas untuk melihat detail riwayat.</p>
                  </div>
                }
              />
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

