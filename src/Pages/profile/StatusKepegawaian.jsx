// src/pages/profile/StatusKepegawaian.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allStatusKepegawaian } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const StatusKepegawaian = () => {
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
      alert(`Berkas SK "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data status disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data status:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data status "${selectedData.status}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data status:", selectedData);
    handleCloseModal();
  };

  // 4. Fungsi untuk merender konten modal
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="status">Status Kepegawaian</label>
            <input type="text" id="status" defaultValue={selectedData.status} />
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
            <label htmlFor="tmtJabatan">TMT. Jabatan</label>
            <input type="text" id="tmtJabatan" defaultValue={selectedData.tmtJabatan} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="gol">Golongan</label>
            <input type="text" id="gol" defaultValue={selectedData.gol} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="pangkat">Pangkat</label>
            <input type="text" id="pangkat" defaultValue={selectedData.pangkat} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SK (Opsional)</label>
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
          <h3>Status Kepegawaian (PNS/CPNS)</h3>
          <p className="subtitle">Informasi status pegawai.</p>
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
            {allStatusKepegawaian.map((item, index) => (
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
        <span>Showing 1 to {allStatusKepegawaian.length} of {allStatusKepegawaian.length} entries</span>
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
        title={modalType === 'edit' ? 'Edit Status Kepegawaian' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default StatusKepegawaian;