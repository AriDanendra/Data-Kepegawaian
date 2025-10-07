// src/pages/profile/RiwayatSKPPermenpan.jsx (Kode Lengkap dengan Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allRiwayatSKPPermenpan } from '../../_mock'; // 1. Impor data baru
import Modal from '../../components/Modal'; // 2. Impor komponen Modal

const RiwayatSKPPermenpan = () => {
  // 3. State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const fileInputRef = useRef(null);

  // 4. Handlers untuk modal
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
      alert(`Berkas SKP Permenpan "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data SKP Permenpan disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data SKP Permenpan tahun "${selectedData.tahun}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data:", selectedData);
    handleCloseModal();
  };

  // 5. Fungsi untuk merender konten modal
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="tahun">Tahun</label>
            <input type="number" id="tahun" defaultValue={selectedData.tahun} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="predikatKinerja">Predikat Kinerja</label>
            <input type="text" id="predikatKinerja" defaultValue={selectedData.predikatKinerja} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="hasilEvaluasi">Hasil Evaluasi</label>
            <input type="text" id="hasilEvaluasi" defaultValue={selectedData.hasilEvaluasi} />
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
          <p>Anda yakin ingin menghapus data SKP Permenpan untuk tahun:</p>
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
          <h3>Riwayat SKP Permenpan</h3>
          <p className="subtitle">Informasi riwayat SKP berdasarkan Permenpan.</p>
        </div>
        <button className="add-button-icon" title="Tambah Data">
          <FaPencilAlt />
        </button>
      </div>

      {/* --- KONTROL TABEL --- */}
      <div className="table-controls">
        <div className="show-entries">
          <label>Show</label>
          <select><option value="10">10</option></select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <label>Search:</label>
          <input type="search" />
        </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tahun</th>
              <th>Predikat Kinerja</th>
              <th>Hasil Evaluasi</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {allRiwayatSKPPermenpan.length > 0 ? (
              allRiwayatSKPPermenpan.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.tahun}</td>
                  <td>{item.predikatKinerja}</td>
                  <td>{item.hasilEvaluasi}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatSKPPermenpan.length} of {allRiwayatSKPPermenpan.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={modalType === 'edit' ? 'Edit Riwayat SKP Permenpan' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatSKPPermenpan;