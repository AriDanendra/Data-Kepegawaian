import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaUserTie, FaUsers, FaBriefcase, FaDollarSign, FaGraduationCap,
  FaChalkboardTeacher, FaAward, FaCalendarAlt, FaSitemap, FaCheckSquare,
  FaBalanceScale
} from 'react-icons/fa';

const ProfilePage = ({ employee }) => {
  // Pengaman jika data employee belum siap (misalnya, masih loading)
  if (!employee) {
    return <div className="main-content">Memuat data pegawai...</div>;
  }

  return (
    <main className="main-content">
      <div className="profile-page-container">
        
        {/* KOLOM KIRI: Kartu Profil Lengkap */}
        <div className="profile-card">
          <img src={employee.profilePictureUrl || "/assets/profile-pic.jpg"} alt="Foto Profil Pegawai" className="profile-picture" />
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
                  <td>Alamat</td>
                  <td>: {employee.alamat}</td>
                </tr>
                {/* --- PENAMBAHAN DETAIL KEPEGAWAIAN LENGKAP --- */}
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
            {/* Mengirimkan seluruh objek 'riwayat' ke komponen anak melalui context */}
            <Outlet context={{ riwayat: employee.riwayat }} />
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProfilePage;