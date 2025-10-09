// src/pages/profile/StatusKepegawaian.jsx (Kode yang Sudah Disesuaikan)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// --- PERUBAHAN UTAMA 1: Ganti 'loggedInEmployee' dengan 'useOutletContext' ---
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// --- PERUBAHAN UTAMA 2: Terima 'data' sebagai prop dengan nama alias 'propData' ---
const StatusKepegawaian = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL ---
  const context = useOutletContext();
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const dataStatusKepegawaian = propData || context?.riwayat?.statusKepegawaian || [];

  // --- MODAL HANDLERS (Logika internal sama) ---
  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ status: '', noSk: '', tglSk: '', tmtJabatan: '', gol: '', pangkat: '' });
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
      alert(`Data status baru "${formData.status}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data status "${formData.status}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data status "${selectedData.status}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data status:", selectedData);
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Status Kepegawaian';
    if (modalType === 'add') return 'Tambah Status Kepegawaian';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="status">Status Kepegawaian</label>
            <select id="status" name="status" value={formData.status || ''} onChange={handleInputChange} required>
                <option value="" disabled>Pilih Status</option>
                <option value="CPNS">CPNS</option>
                <option value="PNS">PNS</option>
                <option value="PPPK">PPPK</option>
                <option value="PTT">PTT</option>
                <option value="BLUD">BLUD</option>
                <option value="PKS">PKS</option>
            </select>
          </div>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            {/* Menggunakan type="date" untuk UX yang lebih baik */}
            <input type="date" id="tglSk" name="tglSk" value={formData.tglSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tmtJabatan">TMT. Jabatan</label>
            {/* Menggunakan type="date" untuk UX yang lebih baik */}
            <input type="date" id="tmtJabatan" name="tmtJabatan" value={formData.tmtJabatan || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="gol">Golongan</label>
            <input type="text" id="gol" name="gol" value={formData.gol || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="pangkat">Pangkat</label>
            <input type="text" id="pangkat" name="pangkat" value={formData.pangkat || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SK (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data status:</p>
          <p><strong>{selectedData.status} ({selectedData.noSk})</strong>?</p>
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
          <h3>Status Kepegawaian (CPNS/PNS, PPPK, PTT, BLUD, PKS)</h3>
          <p className="subtitle">Informasi riwayat status kepegawaian.</p>
        </div>
        <button className="add-button-icon" title="Tambah Status" onClick={() => handleOpenModal('add')}>
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
              <th>Status</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Jabatan</th>
              <th>Gol</th>
              <th>Pangkat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* Menggunakan dataStatusKepegawaian yang fleksibel */}
            {dataStatusKepegawaian.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.status}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmtJabatan}</td>
                <td>{item.gol}</td>
                <td>{item.pangkat}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
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
        <span>Showing 1 to {dataStatusKepegawaian.length} of {dataStatusKepegawaian.length} entries</span>
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

export default StatusKepegawaian;