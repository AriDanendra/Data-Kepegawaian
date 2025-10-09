// src/pages/admin/PegawaiDetailPage.jsx (Koreksi Final)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hapus NavLink dari import
import { 
  FaArrowLeft, FaUserTie, FaUsers, FaBriefcase, FaDollarSign, 
  FaGraduationCap, FaChalkboardTeacher, FaAward, FaCalendarAlt, 
  FaSitemap, FaCheckSquare, FaBalanceScale 
} from 'react-icons/fa';
import './DaftarPegawai.css'; 
// Impor data master pegawai dan komponen riwayat
import allEmployees from '../../_mock'; 
import DataKeluarga from '../profile/DataKeluarga';
import DataKGB from '../profile/DataKGB';
import RiwayatCuti from '../profile/RiwayatCuti';
import RiwayatDiklat from '../profile/RiwayatDiklat';
import RiwayatHukuman from '../profile/RiwayatHukuman';
import RiwayatJabatan from '../profile/RiwayatJabatan';
import RiwayatOrganisasi from '../profile/RiwayatOrganisasi';
import RiwayatPendidikan from '../profile/RiwayatPendidikan';
import RiwayatPenghargaan from '../profile/RiwayatPenghargaan';
import RiwayatSKP from '../profile/RiwayatSKP';
import RiwayatSKPPermenpan from '../profile/RiwayatSKPPermenpan';
import StatusKepegawaian from '../profile/StatusKepegawaian';

// Konfigurasi untuk menu navigasi/tab
const menuItems = [
  { key: 'status', label: 'STATUS KEPEGAWAIAN', icon: FaUserTie },
  { key: 'keluarga', label: 'DATA KELUARGA', icon: FaUsers },
  { key: 'jabatan', label: 'RIWAYAT JABATAN', icon: FaBriefcase },
  { key: 'kgb', label: 'DATA KGB', icon: FaDollarSign },
  { key: 'pendidikan', label: 'RIWAYAT PENDIDIKAN', icon: FaGraduationCap },
  { key: 'diklat', label: 'RIWAYAT DIKLAT', icon: FaChalkboardTeacher },
  { key: 'penghargaan', label: 'RIWAYAT PENGHARGAAN', icon: FaAward },
  { key: 'cuti', label: 'RIWAYAT CUTI', icon: FaCalendarAlt },
  { key: 'organisasi', label: 'RIWAYAT ORGANISASI', icon: FaSitemap },
  { key: 'skp', label: 'RIWAYAT SKP', icon: FaCheckSquare },
  { key: 'skp_permenpan', label: 'RIWAYAT SKP PERMENPAN', icon: FaCheckSquare },
  { key: 'hukuman', label: 'RIWAYAT HUKUMAN', icon: FaBalanceScale },
];

const PegawaiDetailPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jabatan'); // Default ke jabatan

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const foundEmployee = allEmployees.find(emp => emp.id.toString() === employeeId);
    setEmployee(foundEmployee);
    if (foundEmployee) {
      setActiveTab('jabatan'); 
    }
  }, [employeeId]);

  // Fungsi untuk merender konten komponen riwayat berdasarkan tab yang aktif
  const renderContent = () => {
    // Pastikan data riwayat ada sebelum merender komponen
    if (!employee || !employee.riwayat) {
      return (
        <div style={{textAlign: 'center', padding: '2rem', color: '#6c757d'}}>
          <p>Pilih menu di atas untuk melihat detail riwayat.</p>
        </div>
      );
    }

    // Logika renderContent tetap sama, menggunakan data dari employee.riwayat
    switch (activeTab) {
      case 'jabatan':       return <RiwayatJabatan data={employee.riwayat.jabatan} />;
      case 'pendidikan':    return <RiwayatPendidikan data={employee.riwayat.pendidikan} />;
      case 'diklat':        return <RiwayatDiklat data={employee.riwayat.diklat} />;
      case 'kgb':           return <DataKGB data={employee.riwayat.kgb} />;
      case 'status':        return <StatusKepegawaian data={employee.riwayat.statusKepegawaian} />;
      case 'keluarga':      return <DataKeluarga data={employee.riwayat.keluarga} />;
      case 'penghargaan':   return <RiwayatPenghargaan data={employee.riwayat.penghargaan} />;
      case 'organisasi':    return <RiwayatOrganisasi data={employee.riwayat.organisasi} />;
      case 'cuti':          return <RiwayatCuti data={employee.riwayat.cuti} />;
      case 'skp':           return <RiwayatSKP data={employee.riwayat.skp} />;
      case 'skp_permenpan': return <RiwayatSKPPermenpan data={employee.riwayat.skpPermenpan} />;
      case 'hukuman':       return <RiwayatHukuman data={employee.riwayat.hukuman} />;
      default: return <div>Pilih menu untuk melihat detail.</div>;
    }
  };

  if (!employee) {
    return <div className="main-content">Memuat data pegawai... atau Pegawai tidak ditemukan.</div>;
  }
  
  return (
    <div className="pegawai-detail-page">
      {/* Tambahkan kelas page-header-with-back & back-button ke App.css jika belum ada */}
      <header className="page-header-with-back">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Kembali ke Daftar Pegawai</span>
        </button>
      </header>

      {/* Semua kelas di bawah ini sudah ada di App.css Anda untuk ProfilePage */}
      <div className="profile-page-container"> 
        
        {/* KOLOM KIRI: Kartu Profil Lengkap */}
        <div className="profile-card">
          <img src={employee.profilePictureUrl || "/assets/profile-pic.jpg"} alt="Foto Profil Pegawai" className="profile-picture" />
          <div className="profile-data">
            <h3 className="employee-name">{employee.name.toUpperCase()}</h3>
            
            <table>
              <tbody>
                {/* ... Data Profil Tabel Lengkap ... */}
                <tr>
                  <td>NIP</td>
                  <td>: {employee.nip}</td>
                </tr>
                <tr>
                  <td>Tempat/Tgl Lahir</td>
                  <td>: {employee.ttl}</td>
                </tr>
                <tr>
                  <td>Agama</td>
                  <td>: {employee.agama}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>: {employee.alamat}</td>
                </tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr>
                  <td>Pendidikan Terakhir</td>
                  <td>: {employee.pendidikan}</td>
                </tr>
                <tr>
                  <td>Golongan/Pangkat</td>
                  <td>: {employee.golongan}</td>
                </tr>
                <tr>
                  <td>Jabatan</td>
                  <td>: {employee.jabatan}</td>
                </tr>
                <tr>
                  <td>Instansi</td>
                  <td>: {employee.instansi}</td>
                </tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr>
                  <td>No. KTP</td>
                  <td>: {employee.noKtp}</td>
                </tr>
                <tr>
                  <td>No. NPWP</td>
                  <td>: {employee.noNpwp}</td>
                </tr>
                <tr>
                  <td>No. Karpeg</td>
                  <td>: {employee.noKarpeg}</td>
                </tr>
                <tr>
                  <td>No. Karis/Karsu</td>
                  <td>: {employee.noKaris}</td>
                </tr>
                <tr>
                  <td>No. Askes</td>
                  <td>: {employee.noAskes}</td>
                </tr>
                <tr>
                  <td>No. Taspen</td>
                  <td>: {employee.noTaspen}</td>
                </tr>
                <tr>
                  <td>No. Rekening Gaji</td>
                  <td>: {employee.noRekening}</td>
                </tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr>
                  <td>No.Hp/Telp</td>
                  <td>: {employee.nomorHp}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: {employee.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* KOLOM KANAN: Kontainer untuk Kartu Menu dan Kartu Konten */}
        <div className="profile-details-right">

          {/* --- KARTU UNTUK MENU (Grid) --- */}
          <div className="profile-menu-card">
            <div className="profile-menu-grid">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  className={`menu-item ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <item.icon size={20} /> <span>{item.label}</span>
                </button>
              ))}
            </div>
            
          </div>

          {/* --- KARTU UNTUK KONTEN --- */}
          <div className="profile-content-card">
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PegawaiDetailPage;