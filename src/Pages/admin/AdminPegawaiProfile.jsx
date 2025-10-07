import React from 'react';
import { useParams, useNavigate, NavLink, Outlet } from 'react-router-dom';
import allEmployees from '../../_mock';
import {
  FaUserTie, FaUsers, FaBriefcase, FaDollarSign, FaGraduationCap,
  FaChalkboardTeacher, FaAward, FaCalendarAlt, FaSitemap, FaCheckSquare,
  FaBalanceScale, FaArrowLeft
} from 'react-icons/fa';

const AdminPegawaiProfile = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  
  // Cari data pegawai berdasarkan ID dari URL. Ingat untuk mengubah string ke angka.
  const employee = allEmployees.find(emp => emp.id === parseInt(employeeId));

  if (!employee) {
    return (
      <div>
        <h2>Pegawai tidak ditemukan</h2>
        <button onClick={() => navigate('/admin/daftar-pegawai')}>Kembali</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/daftar-pegawai')} className="back-button">
        <FaArrowLeft /> Kembali ke Daftar Pegawai
      </button>
      <div className="profile-page-container" style={{ marginTop: '1rem' }}>
        {/* KOLOM KIRI: Kartu Profil */}
        <div className="profile-card">
          <img src={employee.profilePictureUrl} alt={`Foto ${employee.name}`} className="profile-picture" />
          <div className="profile-data">
             <h3 className="employee-name">{employee.name.toUpperCase()}</h3>
              {/* ... tabel data profil lengkap sama seperti sebelumnya ... */}
              <table>
                <tbody>
                    <tr><td>NIP</td><td>: {employee.nip}</td></tr>
                    {/* ...tambahkan semua <tr> lainnya di sini... */}
                    <tr><td>Email</td><td>: {employee.email}</td></tr>
                </tbody>
              </table>
          </div>
        </div>

        {/* KOLOM KANAN: Menu Riwayat yang Fungsional */}
        <div className="profile-details-right">
          <div className="profile-menu-card">
            <div className="profile-menu-grid">
              {/* Gunakan NavLink dengan path relatif */}
              <NavLink to="status" className="menu-item"><FaUserTie size={20} /><span>STATUS KEPEGAWAIAN</span></NavLink>
              <NavLink to="keluarga" className="menu-item"><FaUsers size={20} /><span>DATA KELUARGA</span></NavLink>
              <NavLink to="jabatan" className="menu-item"><FaBriefcase size={20} /><span>RIWAYAT JABATAN</span></NavLink>
              <NavLink to="kgb" className="menu-item"><FaDollarSign size={20} /><span>DATA KGB</span></NavLink>
              <NavLink to="pendidikan" className="menu-item"><FaGraduationCap size={20} /><span>RIWAYAT PENDIDIKAN</span></NavLink>
              <NavLink to="diklat" className="menu-item"><FaChalkboardTeacher size={20} /><span>RIWAYAT DIKLAT</span></NavLink>
              <NavLink to="penghargaan" className="menu-item"><FaAward size={20} /><span>RIWAYAT PENGHARGAAN</span></NavLink>
              <NavLink to="cuti" className="menu-item"><FaCalendarAlt size={20} /><span>RIWAYAT CUTI</span></NavLink>
              <NavLink to="organisasi" className="menu-item"><FaSitemap size={20} /><span>RIWAYAT ORGANISASI</span></NavLink>
              <NavLink to="skp" className="menu-item"><FaCheckSquare size={20} /><span>RIWAYAT SKP</span></NavLink>
              <NavLink to="skp-permenpan" className="menu-item"><FaCheckSquare size={20} /><span>RIWAYAT SKP PERMENPAN</span></NavLink>
              <NavLink to="hukuman" className="menu-item"><FaBalanceScale size={20} /><span>RIWAYAT HUKUMAN</span></NavLink>
            </div>
          </div>
          <div className="profile-content-card">
            {/* Outlet akan merender komponen riwayat sesuai URL */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPegawaiProfile;