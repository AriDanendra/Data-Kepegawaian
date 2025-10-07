// src/pages/profile/RiwayatOrganisasi.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allRiwayatOrganisasi } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const RiwayatOrganisasi = () => {
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
      alert(`Berkas keanggotaan "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data organisasi disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data organisasi:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data organisasi "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data organisasi:", selectedData);
    handleCloseModal();
  };

  // 4. Fungsi untuk merender konten modal
  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="nama">Nama Organisasi</label>
            <input type="text" id="nama" defaultValue={selectedData.nama} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jenis">Jenis</label>
            <input type="text" id="jenis" defaultValue={selectedData.jenis} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="jabatan">Jabatan</label>
            <input type="text" id="jabatan" defaultValue={selectedData.jabatan} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tempat">Tempat</label>
            <input type="text" id="tempat" defaultValue={selectedData.tempat} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas Keanggotaan (Opsional)</label>
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
              <th>Nama Organisasi</th>
              <th>Jenis</th>
              <th>Jabatan</th>
              <th>Tempat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {allRiwayatOrganisasi.length > 0 ? (
              allRiwayatOrganisasi.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.jenis}</td>
                  <td>{item.jabatan}</td>
                  <td>{item.tempat}</td>
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
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatOrganisasi.length} of {allRiwayatOrganisasi.length} entries</span>
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
        title={modalType === 'edit' ? 'Edit Riwayat Organisasi' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatOrganisasi;