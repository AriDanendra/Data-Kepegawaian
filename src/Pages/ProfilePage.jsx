// src/pages/ProfilePage.jsx (Form Edit Diperbarui)

import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUserTie, FaUsers, FaBriefcase, FaDollarSign, FaGraduationCap,
  FaChalkboardTeacher, FaAward, FaCalendarAlt, FaSitemap, FaCheckSquare,
  FaBalanceScale, FaPencilAlt
} from 'react-icons/fa';
import Modal from '../components/Modal';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  // Semua fungsi handler (handleOpen, handleClose, handleChange, handleSave) tidak perlu diubah
  const handleOpenEditModal = () => {
    setFormData(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setFormData(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert('Profil berhasil diperbarui!');
    console.log('Data profil diperbarui:', formData);
    handleCloseEditModal();
  };

  if (!user) {
    return <div className="main-content">Memuat data pegawai...</div>;
  }

  return (
    <main className="main-content">
      <div className="profile-page-container">
        <div className="profile-card">
          <button 
            className="edit-profile-action-btn"
            title="Edit Profil" 
            onClick={handleOpenEditModal}
          >
            <FaPencilAlt />
          </button>
          <img src={user.profilePictureUrl || "/assets/profile-pic.jpg"} alt="Foto Profil Pegawai" className="profile-picture" />
          <div className="profile-data">
            <h3 className="employee-name">{user.name.toUpperCase()}</h3>
            <table>
              <tbody>
                <tr><td>NIP</td><td>: {user.nip}</td></tr>
                <tr><td>Tempat/Tgl Lahir</td><td>: {user.ttl}</td></tr>
                <tr><td>Agama</td><td>: {user.agama}</td></tr>
                <tr><td>Alamat</td><td>: {user.alamat}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>Pendidikan Terakhir</td><td>: {user.pendidikan}</td></tr>
                <tr><td>Golongan/Pangkat</td><td>: {user.golongan}</td></tr>
                <tr><td>Jabatan</td><td>: {user.jabatan}</td></tr>
                <tr><td>Instansi</td><td>: {user.instansi}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>No. KTP</td><td>: {user.noKtp}</td></tr>
                <tr><td>No. NPWP</td><td>: {user.noNpwp}</td></tr>
                <tr><td>No. Karpeg</td><td>: {user.noKarpeg}</td></tr>
                <tr><td>No. Karis/Karsu</td><td>: {user.noKaris}</td></tr>
                <tr><td>No. Askes</td><td>: {user.noAskes}</td></tr>
                <tr><td>No. Taspen</td><td>: {user.noTaspen}</td></tr>
                <tr><td>No. Rekening Gaji</td><td>: {user.noRekening}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>No.Hp/Telp</td><td>: {user.nomorHp}</td></tr>
                <tr><td>Email</td><td>: {user.email}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="profile-details-right">
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
          <div className="profile-content-card">
            <Outlet context={{ riwayat: user.riwayat }} />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        title="Edit Profil Pegawai"
      >
        {/* Diubah: Form diperluas dengan semua field yang diminta */}
        <form onSubmit={handleSaveChanges}>
          <div className="edit-profile-form-grid">
            <div className="modal-form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input type="text" id="name" name="name" value={formData?.name || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="ttl">Tempat/Tgl Lahir</label>
              <input type="text" id="ttl" name="ttl" value={formData?.ttl || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="agama">Agama</label>
              <input type="text" id="agama" name="agama" value={formData?.agama || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="alamat">Alamat</label>
              <input type="text" id="alamat" name="alamat" value={formData?.alamat || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="pendidikan">Pendidikan Terakhir</label>
              <input type="text" id="pendidikan" name="pendidikan" value={formData?.pendidikan || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="golongan">Golongan/Pangkat</label>
              <input type="text" id="golongan" name="golongan" value={formData?.golongan || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="jabatan">Jabatan</label>
              <input type="text" id="jabatan" name="jabatan" value={formData?.jabatan || ''} onChange={handleFormChange} />
            </div>
             <div className="modal-form-group">
              <label htmlFor="instansi">Instansi</label>
              <input type="text" id="instansi" name="instansi" value={formData?.instansi || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noKtp">No. KTP</label>
              <input type="text" id="noKtp" name="noKtp" value={formData?.noKtp || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noNpwp">No. NPWP</label>
              <input type="text" id="noNpwp" name="noNpwp" value={formData?.noNpwp || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noKarpeg">No. Karpeg</label>
              <input type="text" id="noKarpeg" name="noKarpeg" value={formData?.noKarpeg || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noKaris">No. Karis/Karsu</label>
              <input type="text" id="noKaris" name="noKaris" value={formData?.noKaris || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noAskes">No. Askes</label>
              <input type="text" id="noAskes" name="noAskes" value={formData?.noAskes || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noTaspen">No. Taspen</label>
              <input type="text" id="noTaspen" name="noTaspen" value={formData?.noTaspen || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="noRekening">No. Rekening Gaji</label>
              <input type="text" id="noRekening" name="noRekening" value={formData?.noRekening || ''} onChange={handleFormChange} />
            </div>
            <div className="modal-form-group">
              <label htmlFor="nomorHp">No. HP/Telepon</label>
              <input type="text" id="nomorHp" name="nomorHp" value={formData?.nomorHp || ''} onChange={handleFormChange} />
            </div>
             <div className="modal-form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData?.email || ''} onChange={handleFormChange} />
            </div>
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default ProfilePage;