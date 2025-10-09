// src/pages/profile/RiwayatPendidikan.jsx (Kode yang Sudah Disesuaikan)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
// --- PERUBAHAN UTAMA 1: Hapus import 'loggedInEmployee', ganti dengan 'useOutletContext' ---
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// --- PERUBAHAN UTAMA 2: Terima 'data' sebagai prop dengan nama alias 'propData' ---
const RiwayatPendidikan = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL ---
  const context = useOutletContext();
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const dataRiwayatPendidikan = propData || context?.riwayat?.pendidikan || [];

  // --- MODAL HANDLERS (Logika internal sama, hanya menggunakan 'dataItem') ---
  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ namaSekolah: '', jurusan: '', lokasi: '', noIjazah: '', lulus: '' });
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
      alert(`Data pendidikan baru "${formData.namaSekolah}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data pendidikan "${formData.namaSekolah}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data pendidikan "${selectedData.namaSekolah}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data pendidikan:", selectedData);
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING (Tidak ada perubahan di sini) ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Pendidikan';
    if (modalType === 'add') return 'Tambah Riwayat Pendidikan';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="namaSekolah">Nama Sekolah</label>
            <input type="text" id="namaSekolah" name="namaSekolah" value={formData.namaSekolah || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jurusan">Jurusan</label>
            <input type="text" id="jurusan" name="jurusan" value={formData.jurusan || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="lokasi">Lokasi</label>
            <input type="text" id="lokasi" name="lokasi" value={formData.lokasi || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="noIjazah">No. Ijazah</label>
            <input type="text" id="noIjazah" name="noIjazah" value={formData.noIjazah || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="lulus">Tahun Lulus</label>
            <input type="text" id="lulus" name="lulus" value={formData.lulus || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Ijazah (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data pendidikan:</p>
          <p><strong>{selectedData.namaSekolah} - Jurusan {selectedData.jurusan}</strong>?</p>
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
          <h3>Riwayat Pendidikan</h3>
          <p className="subtitle">Informasi riwayat pendidikan.</p>
        </div>
        <button className="add-button-icon" title="Tambah Riwayat Pendidikan" onClick={() => handleOpenModal('add')}>
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
              <th>Nama Sekolah</th>
              <th>Jurusan</th>
              <th>Lokasi</th>
              <th>No. Ijazah</th>
              <th>Lulus</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* Menggunakan dataRiwayatPendidikan yang fleksibel */}
            {dataRiwayatPendidikan.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.namaSekolah}</td>
                <td>{item.jurusan}</td>
                <td>{item.lokasi}</td>
                <td>{item.noIjazah}</td>
                <td>{item.lulus}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button">Download</a>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn refresh"><FaSync /></button>
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
        <span>Showing 1 to {dataRiwayatPendidikan.length} of {dataRiwayatPendidikan.length} entries</span>
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

export default RiwayatPendidikan;