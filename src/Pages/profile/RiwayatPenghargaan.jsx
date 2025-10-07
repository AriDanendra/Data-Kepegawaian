// src/pages/profile/RiwayatPenghargaan.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allRiwayatPenghargaan } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const RiwayatPenghargaan = () => {
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
      alert(`Sertifikat penghargaan "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data penghargaan disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data penghargaan:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data penghargaan "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data penghargaan:", selectedData);
    handleCloseModal();
  };

  // 4. Fungsi untuk merender konten modal
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="nama">Nama Penghargaan</label>
            <input type="text" id="nama" defaultValue={selectedData.nama} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="oleh">Diberikan Oleh</label>
            <input type="text" id="oleh" defaultValue={selectedData.oleh} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" defaultValue={selectedData.noSk} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            <input type="text" id="tglSk" defaultValue={selectedData.tglSk} />
          </div>
           <div className="modal-form-group">
            <label htmlFor="tahun">Tahun</label>
            <input type="text" id="tahun" defaultValue={selectedData.tahun} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Sertifikat/Piagam (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data penghargaan:</p>
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
          <h3>Riwayat Tanda Jasa/Penghargaan</h3>
          <p className="subtitle">Informasi riwayat tanda jasa/penghargaan.</p>
        </div>
        <button className="add-button-icon"><FaPencilAlt /></button>
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
              <th>Nama Penghargaan</th>
              <th>Oleh</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>Tahun</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {allRiwayatPenghargaan.length > 0 ? (
              allRiwayatPenghargaan.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.oleh}</td>
                  <td>{item.noSk}</td>
                  <td>{item.tglSk}</td>
                  <td>{item.tahun}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                       {/* 5. Tambahkan onClick untuk membuka modal */}
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatPenghargaan.length} of {allRiwayatPenghargaan.length} entries</span>
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
        title={modalType === 'edit' ? 'Edit Riwayat Penghargaan' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatPenghargaan;