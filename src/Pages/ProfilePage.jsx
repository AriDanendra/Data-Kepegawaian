import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaUserTie, FaUsers, FaBriefcase, FaDollarSign, FaGraduationCap,
  FaChalkboardTeacher, FaAward, FaCalendarAlt, FaSitemap, FaCheckSquare,
  FaBalanceScale
} from 'react-icons/fa';

const ProfilePage = ({ employee }) => {
  return (
    <main className="main-content">
      <div className="profile-page-container">
        
        {/* KOLOM KIRI: Kartu Profil Lengkap */}
        <div className="profile-card">
          <img src="/assets/profile-pic.jpg" alt="Foto Profil Pegawai" className="profile-picture" />
          <div className="profile-data">
            <h3 className="employee-name">{employee.name.toUpperCase()}</h3>
            
            <table>
              <tbody>
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
                  <td>Suku</td>
                  <td>: {employee.suku}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>: {employee.alamat}</td>
                </tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td colSpan="2">{employee.pendidikan}</td></tr>
                <tr><td colSpan="2">{employee.golongan}</td></tr>
                <tr><td colSpan="2">{employee.jabatan}</td></tr>
                <tr><td colSpan="2">{employee.instansi}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr>
                  <td>No.Hp/Telp</td>
                  <td>: {employee.nomorHp}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: {employee.email}</td>
                </tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr className="additional-info">
                  <td>No KTP</td>
                  <td>: {employee.noKtp}</td>
                </tr>
                <tr className="additional-info">
                  <td>No NPWP</td>
                  <td>: {employee.noNpwp}</td>
                </tr>
                <tr className="additional-info">
                  <td>No Karpeg</td>
                  <td>: {employee.noKarpeg}</td>
                </tr>
                <tr className="additional-info">
                  <td>No Karis</td>
                  <td>: {employee.noKaris}</td>
                </tr>
                <tr className="additional-info">
                  <td>No Askes</td>
                  <td>: {employee.noAskes}</td>
                </tr>
                <tr className="additional-info">
                  <td>No Taspen</td>
                  <td>: {employee.noTaspen}</td>
                </tr>
                <tr className="additional-info">
                  <td>No Rekening</td>
                  <td>: {employee.noRekening}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* KOLOM KANAN: Kontainer untuk Kartu Menu dan Kartu Konten */}
        <div className="profile-details-right">

          {/* --- KARTU UNTUK MENU --- */}
          <div className="profile-menu-card">
            <div className="profile-menu-grid">
              <NavLink to="/profile/status" className="menu-item"><FaUserTie size={20} /> <span>STATUS KEPEGAWAIAN</span></NavLink>
              <NavLink to="/profile/keluarga" className="menu-item"><FaUsers size={20} /> <span>DATA KELUARGA</span></NavLink>
              <NavLink to="/profile/jabatan" className="menu-item"><FaBriefcase size={20} /> <span>RIWAYAT JABATAN</span></NavLink>
              <NavLink to="/profile/kgb" className="menu-item"><FaDollarSign size={20} /> <span>DATA KGB</span></NavLink>
              <NavLink to="/profile/pendidikan" className="menu-item"><FaGraduationCap size={20} /> <span>RIWAYAT PENDIDIKAN</span></NavLink>
              <NavLink to="/profile/diklat" className="menu-item"><FaChalkboardTeacher size={20} /> <span>RIWAYAT DIKLAT</span></NavLink>
              <NavLink to="/profile/penghargaan" className="menu-item"><FaAward size={20} /> <span>RIWAYAT PENGHARGAAN</span></NavLink>
              <NavLink to="/profile/cuti" className="menu-item"><FaCalendarAlt size={20} /> <span>RIWAYAT CUTI</span></NavLink>
              <NavLink to="/profile/organisasi" className="menu-item"><FaSitemap size={20} /> <span>RIWAYAT ORGANISASI</span></NavLink>
              <NavLink to="/profile/skp" className="menu-item"><FaCheckSquare size={20} /> <span>RIWAYAT SKP</span></NavLink>
              <NavLink to="/profile/skp-permenpan" className="menu-item"><FaCheckSquare size={20} /> <span>RIWAYAT SKP PERMENPAN</span></NavLink>
              <NavLink to="/profile/hukuman" className="menu-item"><FaBalanceScale size={20} /> <span>RIWAYAT HUKUMAN</span></NavLink>
            </div>
          </div>

          {/* --- KARTU UNTUK KONTEN (TABEL, DLL) --- */}
          <div className="profile-content-card">
            <Outlet />
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProfilePage;