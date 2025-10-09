// src/pages/profile/RiwayatSKP.jsx (Kode yang Sudah Disesuaikan)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
// --- PERUBAHAN UTAMA 1: Ganti 'loggedInEmployee' dengan 'useOutletContext' ---
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// --- PERUBAHAN UTAMA 2: Terima 'data' sebagai prop dengan nama alias 'propData' ---
const RiwayatSKP = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL ---
  const context = useOutletContext();
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const dataRiwayatSKP = propData || context?.riwayat?.skp || [];

  // --- MODAL HANDLERS ---
  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ tahun: '', nilaiSKP: '', nilaiPerilaku: '', nilaiPrestasi: '' });
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
      alert(`Data SKP baru untuk tahun "${formData.tahun}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data SKP untuk tahun "${formData.tahun}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data SKP tahun "${selectedData.tahun}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data SKP:", selectedData);
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat SKP';
    if (modalType === 'add') return 'Tambah Riwayat SKP';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="tahun">Tahun</label>
            {/* Menggunakan type="number" untuk tahun */}
            <input type="number" id="tahun" name="tahun" value={formData.tahun || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiSKP">Nilai SKP</label>
            <input type="number" step="0.01" id="nilaiSKP" name="nilaiSKP" value={formData.nilaiSKP || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiPerilaku">Nilai Perilaku</label>
            <input type="number" step="0.01" id="nilaiPerilaku" name="nilaiPerilaku" value={formData.nilaiPerilaku || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiPrestasi">Nilai Prestasi</label>
            <input type="number" step="0.01" id="nilaiPrestasi" name="nilaiPrestasi" value={formData.nilaiPrestasi || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SKP (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data SKP untuk tahun:</p>
          <p><strong>{selectedData.tahun}</strong>?</p>
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
          <h3>Riwayat SKP</h3>
          <p className="subtitle">Informasi riwayat SKP.</p>
        </div>
        <button className="add-button-icon" title="Tambah Riwayat SKP" onClick={() => handleOpenModal('add')}>
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
              <th>Tahun</th>
              <th>Nilai SKP</th>
              <th>Nilai Perilaku</th>
              <th>Nilai Prestasi</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* Menggunakan dataRiwayatSKP yang fleksibel */}
            {dataRiwayatSKP.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tahun}</td>
                <td>{item.nilaiSKP}</td>
                <td>{item.nilaiPerilaku}</td>
                <td>{item.nilaiPrestasi}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn refresh" title="Refresh"><FaSync /></button>
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
        <span>Showing 1 to {dataRiwayatSKP.length} of {dataRiwayatSKP.length} entries</span>
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

export default RiwayatSKP;