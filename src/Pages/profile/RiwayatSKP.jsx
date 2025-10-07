// src/pages/profile/RiwayatSKP.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
import { allRiwayatSKP } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const RiwayatSKP = () => {
  // 2. State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const fileInputRef = useRef(null);

  // 3. Handlers untuk modal
  const handleOpenModal = (type, data) => {
    setModalType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedData(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    if (file) {
      alert(`Berkas SKP "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data SKP disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data SKP:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data SKP tahun "${selectedData.tahun}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data SKP:", selectedData);
    handleCloseModal();
  };

  // 4. Fungsi untuk merender konten modal
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="tahun">Tahun</label>
            <input type="number" id="tahun" defaultValue={selectedData.tahun} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiSKP">Nilai SKP</label>
            <input type="number" step="0.1" id="nilaiSKP" defaultValue={selectedData.nilaiSKP} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiPerilaku">Nilai Perilaku</label>
            <input type="number" step="0.1" id="nilaiPerilaku" defaultValue={selectedData.nilaiPerilaku} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nilaiPrestasi">Nilai Prestasi</label>
            <input type="number" step="0.1" id="nilaiPrestasi" defaultValue={selectedData.nilaiPrestasi} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SKP (Opsional)</label>
            <input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
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
        <button className="add-button-icon">
          <FaPencilAlt />
        </button>
      </div>

      {/* --- KONTROL TABEL --- */}
      <div className="table-controls">
        <div className="show-entries">
          <label htmlFor="entries">Show</label>
          <select name="entries" id="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <label htmlFor="search">Search:</label>
          <input type="search" id="search" />
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
            {allRiwayatSKP.map((item, index) => (
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
                     {/* 5. Tambahkan onClick untuk membuka modal */}
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
        <span>Showing 1 to {allRiwayatSKP.length} of {allRiwayatSKP.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

      {/* 6. Render komponen Modal di sini */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={modalType === 'edit' ? 'Edit Riwayat SKP' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatSKP;