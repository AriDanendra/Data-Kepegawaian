// src/pages/profile/RiwayatOrganisasi.jsx (Kode yang Sudah Disesuaikan)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// --- PERUBAHAN UTAMA 1: Hapus loggedInEmployee, ganti dengan useOutletContext ---
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// --- PERUBAHAN UTAMA 2: Terima 'data' sebagai prop dengan nama alias 'propData' ---
const RiwayatOrganisasi = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL (Sama seperti komponen riwayat lainnya) ---
  const context = useOutletContext();
  
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const dataRiwayatOrganisasi = propData || context?.riwayat?.organisasi || [];

  // --- MODAL HANDLERS (Tidak ada perubahan di logika internal) ---
  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ nama: '', jenis: '', jabatan: '', tempat: '' });
    } else { // 'delete'
      setSelectedData(dataItem);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedData(null);
    setFormData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    
    if (modalType === 'add') {
      alert(`Data organisasi baru "${formData.nama}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data organisasi "${formData.nama}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data organisasi "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data organisasi:", selectedData);
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING (Tidak ada perubahan) ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Organisasi';
    if (modalType === 'add') return 'Tambah Riwayat Organisasi';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="nama">Nama Organisasi</label>
            <input type="text" id="nama" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jenis">Jenis</label>
            <input type="text" id="jenis" name="jenis" value={formData.jenis || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jabatan">Jabatan</label>
            <input type="text" id="jabatan" name="jabatan" value={formData.jabatan || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tempat">Tempat</label>
            <input type="text" id="tempat" name="tempat" value={formData.tempat || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas Keanggotaan (Opsional)</label>
            <input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data organisasi:</p>
          <p><strong>{selectedData.nama}</strong>?</p>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Keanggotaan Organisasi</h3>
          <p className="subtitle">Informasi riwayat keanggotaan organisasi.</p>
        </div>
        <button className="add-button-icon" title="Tambah Organisasi" onClick={() => handleOpenModal('add')}>
            <FaPencilAlt />
        </button>
      </div>

      {/* --- KONTROL TABEL --- */}
      <div className="table-controls">
        <div className="show-entries">
          <label>Show</label> <select><option value="10">10</option></select> <span>entries</span>
        </div>
        <div className="search-box">
          <label>Search:</label> <input type="search" />
        </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Organisasi</th>
              <th>Jenis</th>
              <th>Jabatan</th>
              <th>Tempat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* Gunakan 'dataRiwayatOrganisasi' yang fleksibel */}
            {dataRiwayatOrganisasi.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>{item.jabatan}</td>
                <td>{item.tempat}</td>
                <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit', item)}><FaPencilAlt /></button>
                    <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete', item)}><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        {/* Gunakan .length dari variabel yang fleksibel */}
        <span>Showing 1 to {dataRiwayatOrganisasi.length} of {dataRiwayatOrganisasi.length} entries</span>
        <div className="pagination">
          {/* ... Pagination tidak diubah ... */}
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatOrganisasi;