// src/pages/profile/RiwayatCuti.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allRiwayatCuti } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const RiwayatCuti = () => {
  // 2. State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const fileInputRef = useRef(null);

  // 3. Handlers untuk membuka dan menutup modal
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

  // 4. Handlers untuk menyimpan perubahan dan menghapus (simulasi)
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    if (file) {
      alert(`Berkas surat cuti "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data cuti disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data cuti:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data cuti "${selectedData.jenisCuti}" dengan No. Surat "${selectedData.nomorSurat}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data cuti:", selectedData);
    handleCloseModal();
  };

  // 5. Fungsi untuk merender konten modal secara dinamis
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="jenisCuti">Jenis Cuti</label>
            <input type="text" id="jenisCuti" defaultValue={selectedData.jenisCuti} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="nomorSurat">Nomor Surat</label>
            <input type="text" id="nomorSurat" defaultValue={selectedData.nomorSurat} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tanggalSurat">Tanggal Surat</label>
            <input type="text" id="tanggalSurat" defaultValue={selectedData.tanggalSurat} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tanggalAwal">Tanggal Awal</label>
            <input type="text" id="tanggalAwal" defaultValue={selectedData.tanggalAwal} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tanggalSelesai">Tanggal Selesai</label>
            <input type="text" id="tanggalSelesai" defaultValue={selectedData.tanggalSelesai} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Surat Izin Cuti (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data cuti:</p>
          <p><strong>{selectedData.jenisCuti} ({selectedData.nomorSurat})</strong>?</p>
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
          <h3>Riwayat Cuti</h3>
          <p className="subtitle">Informasi Cuti.</p>
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
              <th>No</th>
              <th>Jenis Cuti</th>
              <th>Nomor Surat</th>
              <th>Tanggal Surat</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Selesai</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {allRiwayatCuti.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.jenisCuti}</td>
                <td>{item.nomorSurat}</td>
                <td>{item.tanggalSurat}</td>
                <td>{item.tanggalAwal}</td>
                <td>{item.tanggalSelesai}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
                <td>
                  <div className="action-buttons">
                    {/* 6. Tambahkan onClick untuk membuka modal */}
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
        <span>Showing 1 to {allRiwayatCuti.length} of {allRiwayatCuti.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

      {/* 7. Render komponen Modal di sini */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={modalType === 'edit' ? 'Edit Riwayat Cuti' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatCuti;