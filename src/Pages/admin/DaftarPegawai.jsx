// src/pages/admin/DaftarPegawai.jsx (Dengan Modal Tambah Pegawai)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPencilAlt, FaTrash, FaPlus, FaIdCard } from 'react-icons/fa';
import initialEmployees from '../../_mock';
import Modal from '../../components/Modal';
import './DaftarPegawai.css';

const DaftarPegawai = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // --- STATE MODAL ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Ditambahkan: State untuk modal tambah
  
  // --- STATE FORM DATA ---
  const [editFormData, setEditFormData] = useState({});
  // Ditambahkan: State untuk form tambah data
  const [addFormData, setAddFormData] = useState({
    name: '',
    nip: '',
    jabatan: '',
    golongan: '',
  });

  // --- FUNGSI NAVIGASI ---
  const handleOpenDetail = (employeeId) => {
    navigate(`/admin/pegawai/detail/${employeeId}`);
  };

  // --- FUNGSI-FUNGSI MODAL ---
  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData(employee);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  // Ditambahkan: Fungsi untuk membuka modal tambah
  const handleOpenAddModal = () => {
    // Reset form setiap kali dibuka
    setAddFormData({ name: '', nip: '', jabatan: '', golongan: '' });
    setIsAddModalOpen(true);
  };

  // Diubah: handleCloseModals sekarang juga menutup modal tambah
  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false); // Ditambahkan
    setSelectedEmployee(null);
  };

  // --- FUNGSI AKSI (CRUD) ---
  const handleDeleteEmployee = () => {
    console.log(`HAPUS: Data pegawai "${selectedEmployee.name}" akan dihapus.`, selectedEmployee);
    alert(`Data pegawai "${selectedEmployee.name}" berhasil dihapus.`);
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    handleCloseModals();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    console.log(`EDIT: Data pegawai "${editFormData.name}" akan diperbarui.`, editFormData);
    alert(`Data pegawai "${editFormData.name}" berhasil diperbarui.`);
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? editFormData : emp
    ));
    handleCloseModals();
  };

  // Ditambahkan: Fungsi untuk menyimpan pegawai baru
  const handleSaveAdd = (e) => {
    e.preventDefault();
    const newId = Date.now(); // Membuat ID unik sederhana untuk data mock
    const newEmployee = {
      id: newId,
      name: addFormData.name,
      // Membuat format NIP yang konsisten dengan data mock lainnya
      nip: `010229XXX / ${addFormData.nip}`, 
      jabatan: addFormData.jabatan,
      golongan: addFormData.golongan,
      // Menambahkan data default agar kartu tidak error
      profilePictureUrl: '/assets/profile-pic.jpg', 
      riwayat: {},
    };

    console.log('TAMBAH: Data pegawai baru akan ditambahkan.', newEmployee);
    alert(`Pegawai baru "${newEmployee.name}" berhasil ditambahkan.`);
    
    // Menambahkan pegawai baru di awal array agar muncul paling atas
    setEmployees([newEmployee, ...employees]);
    handleCloseModals();
  };


  // --- FUNGSI-FUNGSI FORM CHANGE HANDLER ---
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Ditambahkan: Handler untuk form tambah
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };
  
  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div><h3>Manajemen Daftar Pegawai</h3><p className="subtitle">Kelola data master semua pegawai.</p></div>
        {/* Diubah: Menambahkan onClick untuk memanggil modal tambah */}
        <button className="btn-tambah-pegawai" title="Tambah Pegawai Baru" onClick={handleOpenAddModal}>
          <FaPlus style={{ marginRight: '8px' }} />Tambah Pegawai
        </button>
      </div>
      
      {/* ... Sisa JSX (table-controls, pegawai-card-grid, table-footer) tidak berubah ... */}
      <div className="table-controls">
        <div className="show-entries"><label htmlFor="entries">Show</label><select name="entries" id="entries"><option value="10">10</option></select><span>entries</span></div>
        <div className="search-box"><label htmlFor="search">Search:</label><input type="search" id="search" /></div>
      </div>
      <div className="pegawai-card-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="pegawai-item-card profile-content-card">
            <div className="pegawai-card-header">
              <img src={employee.profilePictureUrl} alt={employee.name} className="pegawai-foto-card" />
              <div className="pegawai-details">
                <h4 className="employee-name">{employee.name}</h4>
                <p className="pegawai-nip-card"><FaIdCard className="icon-detail" /> {employee.nip.split(' / ')[1]}</p>
              </div>
            </div>
            <div className="pegawai-card-body">
              <div className="detail-item"><span className="detail-label">Jabatan:</span><span className="detail-value">{employee.jabatan}</span></div>
              <div className="detail-item"><span className="detail-label">Golongan:</span><span className="detail-value">{employee.golongan}</span></div>
            </div>
            <div className="card-action-buttons">
              <button className="action-btn view" title="Lihat Detail Profil" onClick={() => handleOpenDetail(employee.id)}><FaEye /> Detail</button>
              <button className="action-btn edit" title="Edit Pegawai" onClick={() => handleOpenEditModal(employee)}><FaPencilAlt /> Edit</button>
              <button className="action-btn delete" title="Hapus Pegawai" onClick={() => handleOpenDeleteModal(employee)}><FaTrash /> Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <div className="table-footer">
        <span>Showing 1 to {employees.length} of {employees.length} entries</span>
        <div className="pagination"><button>Previous</button><button className="active">1</button><button>Next</button></div>
      </div>

      {/* --- KUMPULAN MODAL --- */}

      {/* Ditambahkan: Modal untuk Tambah Pegawai */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={handleCloseModals} 
        title="Tambah Pegawai Baru"
      >
        <form onSubmit={handleSaveAdd}>
          <div className="modal-form-group">
            <label htmlFor="add-name">Nama Lengkap</label>
            <input type="text" id="add-name" name="name" value={addFormData.name} onChange={handleAddFormChange} required />
          </div>
           <div className="modal-form-group">
            <label htmlFor="add-nip">NIP</label>
            <input type="text" id="add-nip" name="nip" value={addFormData.nip} onChange={handleAddFormChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="add-jabatan">Jabatan</label>
            <input type="text" id="add-jabatan" name="jabatan" value={addFormData.jabatan} onChange={handleAddFormChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="add-golongan">Golongan</label>
            <input type="text" id="add-golongan" name="golongan" value={addFormData.golongan} onChange={handleAddFormChange} required />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Pegawai */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={handleCloseModals} 
        title={`Edit Data: ${selectedEmployee?.name}`}
      >
        <form onSubmit={handleSaveEdit}>
          <div className="modal-form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input type="text" id="name" name="name" value={editFormData.name || ''} onChange={handleEditFormChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jabatan">Jabatan</label>
            <input type="text" id="jabatan" name="jabatan" value={editFormData.jabatan || ''} onChange={handleEditFormChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="golongan">Golongan</label>
            <input type="text" id="golongan" name="golongan" value={editFormData.golongan || ''} onChange={handleEditFormChange} />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCloseModals} 
        title="Konfirmasi Hapus"
      >
        <div className="delete-confirmation">
          <p>Apakah Anda yakin ingin menghapus data pegawai:</p>
          <p><strong>{selectedEmployee?.name}</strong>?</p>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button>
            <button className="btn btn-danger" onClick={handleDeleteEmployee}>Hapus</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DaftarPegawai;