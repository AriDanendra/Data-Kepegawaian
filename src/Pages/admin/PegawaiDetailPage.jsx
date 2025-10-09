// src/pages/admin/PegawaiDetailPage.jsx (Kode Lengkap dengan Form Edit Penuh)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUserTie, FaUsers, FaBriefcase, FaDollarSign, 
  FaGraduationCap, FaChalkboardTeacher, FaAward, FaCalendarAlt, 
  FaSitemap, FaCheckSquare, FaBalanceScale, FaPencilAlt
} from 'react-icons/fa';
import './DaftarPegawai.css'; 

// Impor data & komponen
import allEmployees from '../../_mock'; 
import Modal from '../../components/Modal';
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
  const [activeTab, setActiveTab] = useState('jabatan');
  const [employee, setEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const foundEmployee = allEmployees.find(emp => emp.id.toString() === employeeId);
    setEmployee(foundEmployee);
    if (foundEmployee) {
      setActiveTab('jabatan'); 
    }
  }, [employeeId]);

  const handleOpenEditModal = () => {
    setFormData(employee);
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
    setEmployee(formData); 
    alert(`Profil ${formData.name} berhasil diperbarui!`);
    console.log('Data profil diperbarui (sisi admin):', formData);
    handleCloseEditModal();
  };
  
  const renderContent = () => {
    if (!employee || !employee.riwayat) {
      return <div style={{textAlign: 'center', padding: '2rem', color: '#6c757d'}}><p>Pilih menu di atas untuk melihat detail riwayat.</p></div>;
    }
    switch (activeTab) {
      case 'jabatan':       return <RiwayatJabatan data={employee.riwayat.jabatan} />;
      case 'pendidikan':    return <RiwayatPendidikan data={employee.riwayat.pendidikan} />;
      case 'diklat':        return <RiwayatDiklat data={employee.riwayat.diklat} />;
      case 'kgb':           return <DataKGB data={employee.riwayat.kgb} />;
      case 'status':        return <StatusKepegawaian data={employee.riwayat.statusKepegawaian} />;
      case 'keluarga':      return <DataKeluarga data={employee.riwayat.keluarga} />;
      case 'penghargaan':   return <RiwayatPenghargaan data={employee.riwayat.penghargaan} />;
      case 'organisasi':    return <RiwayatOrganisasi data={employee.riwayat.organisasi} />;
      case 'cuti':          return <RiwayatCuti data={employee.riwayat.cuti} />;
      case 'skp':           return <RiwayatSKP data={employee.riwayat.skp} />;
      case 'skp_permenpan': return <RiwayatSKPPermenpan data={employee.riwayat.skpPermenpan} />;
      case 'hukuman':       return <RiwayatHukuman data={employee.riwayat.hukuman} />;
      default: return <div>Pilih menu untuk melihat detail.</div>;
    }
  };

  if (!employee) {
    return <div className="main-content">Memuat data pegawai... atau Pegawai tidak ditemukan.</div>;
  }
  
  return (
    <div className="pegawai-detail-page">
      <header className="page-header-with-back">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Kembali ke Daftar Pegawai</span>
        </button>
      </header>

      <div className="profile-page-container"> 
        <div className="profile-card">
          <button 
            className="edit-profile-action-btn"
            title="Edit Profil Pegawai" 
            onClick={handleOpenEditModal}
          >
            <FaPencilAlt />
          </button>
          <img src={employee.profilePictureUrl || "/assets/profile-pic.jpg"} alt="Foto Profil Pegawai" className="profile-picture" />
          <div className="profile-data">
            <h3 className="employee-name">{employee.name.toUpperCase()}</h3>
            <table>
              <tbody>
                <tr><td>NIP</td><td>: {employee.nip}</td></tr>
                <tr><td>Tempat/Tgl Lahir</td><td>: {employee.ttl}</td></tr>
                <tr><td>Agama</td><td>: {employee.agama}</td></tr>
                <tr><td>Alamat</td><td>: {employee.alamat}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>Pendidikan Terakhir</td><td>: {employee.pendidikan}</td></tr>
                <tr><td>Golongan/Pangkat</td><td>: {employee.golongan}</td></tr>
                <tr><td>Jabatan</td><td>: {employee.jabatan}</td></tr>
                <tr><td>Instansi</td><td>: {employee.instansi}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>No. KTP</td><td>: {employee.noKtp}</td></tr>
                <tr><td>No. NPWP</td><td>: {employee.noNpwp}</td></tr>
                <tr><td>No. Karpeg</td><td>: {employee.noKarpeg}</td></tr>
                <tr><td>No. Karis/Karsu</td><td>: {employee.noKaris}</td></tr>
                <tr><td>No. Askes</td><td>: {employee.noAskes}</td></tr>
                <tr><td>No. Taspen</td><td>: {employee.noTaspen}</td></tr>
                <tr><td>No. Rekening Gaji</td><td>: {employee.noRekening}</td></tr>
                <tr><td colSpan="2"><hr /></td></tr>
                <tr><td>No.Hp/Telp</td><td>: {employee.nomorHp}</td></tr>
                <tr><td>Email</td><td>: {employee.email}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="profile-details-right">
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
            <div className="profile-content-card">{renderContent()}</div>
        </div>
      </div>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        title={`Edit Profil: ${employee.name}`}
      >
        <form onSubmit={handleSaveChanges}>
          <div className="edit-profile-form-grid">
            <div className="modal-form-group"><label htmlFor="name">Nama Lengkap</label><input type="text" id="name" name="name" value={formData?.name || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="ttl">Tempat/Tgl Lahir</label><input type="text" id="ttl" name="ttl" value={formData?.ttl || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="agama">Agama</label><input type="text" id="agama" name="agama" value={formData?.agama || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="alamat">Alamat</label><input type="text" id="alamat" name="alamat" value={formData?.alamat || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="pendidikan">Pendidikan Terakhir</label><input type="text" id="pendidikan" name="pendidikan" value={formData?.pendidikan || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="golongan">Golongan/Pangkat</label><input type="text" id="golongan" name="golongan" value={formData?.golongan || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="jabatan">Jabatan</label><input type="text" id="jabatan" name="jabatan" value={formData?.jabatan || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="instansi">Instansi</label><input type="text" id="instansi" name="instansi" value={formData?.instansi || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noKtp">No. KTP</label><input type="text" id="noKtp" name="noKtp" value={formData?.noKtp || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noNpwp">No. NPWP</label><input type="text" id="noNpwp" name="noNpwp" value={formData?.noNpwp || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noKarpeg">No. Karpeg</label><input type="text" id="noKarpeg" name="noKarpeg" value={formData?.noKarpeg || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noKaris">No. Karis/Karsu</label><input type="text" id="noKaris" name="noKaris" value={formData?.noKaris || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noAskes">No. Askes</label><input type="text" id="noAskes" name="noAskes" value={formData?.noAskes || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noTaspen">No. Taspen</label><input type="text" id="noTaspen" name="noTaspen" value={formData?.noTaspen || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="noRekening">No. Rekening Gaji</label><input type="text" id="noRekening" name="noRekening" value={formData?.noRekening || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="nomorHp">No. HP/Telepon</label><input type="text" id="nomorHp" name="nomorHp" value={formData?.nomorHp || ''} onChange={handleFormChange} /></div>
            <div className="modal-form-group"><label htmlFor="email">Email</label><input type="email" id="email" name="email" value={formData?.email || ''} onChange={handleFormChange} /></div>
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PegawaiDetailPage;