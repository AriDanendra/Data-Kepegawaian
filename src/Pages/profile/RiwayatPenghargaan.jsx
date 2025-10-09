// src/pages/profile/RiwayatPenghargaan.jsx (Diubah ke type="text")

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// Dihapus: Helper functions untuk konversi tanggal tidak lagi diperlukan
// const formatDateForInput = ...
// const formatDateForDisplay = ...


const RiwayatPenghargaan = ({ data: propData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  const context = useOutletContext();
  const dataRiwayatPenghargaan = propData || context?.riwayat?.penghargaan || [];

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      // Diubah: Logika disederhanakan, tidak perlu konversi
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ nama: '', oleh: '', noSk: '', tglSk: '', tahun: '' });
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
    
    // Diubah: Logika disederhanakan, tidak perlu konversi
    if (modalType === 'add') {
      alert(`Data penghargaan baru "${formData.nama}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data penghargaan "${formData.nama}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data penghargaan "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data penghargaan:", selectedData);
    handleCloseModal();
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Penghargaan';
    if (modalType === 'add') return 'Tambah Riwayat Penghargaan';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="nama">Nama Penghargaan</label>
            <input type="text" id="nama" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="oleh">Diberikan Oleh</label>
            <input type="text" id="oleh" name="oleh" value={formData.oleh || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            {/* Diubah: type="date" menjadi type="text" */}
            <input type="text" id="tglSk" name="tglSk" placeholder="dd-mm-yyyy" value={formData.tglSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tahun">Tahun</label>
            <input type="text" id="tahun" name="tahun" value={formData.tahun || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Sertifikat/Piagam (Opsional)</label>
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
        {/* ... sisa kode JSX tidak berubah ... */}
        <div className="riwayat-header">
            <div><h3>Riwayat Tanda Jasa/Penghargaan</h3><p className="subtitle">Informasi riwayat tanda jasa/penghargaan.</p></div>
            <button className="add-button-icon" title="Tambah Penghargaan" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
        </div>
        <div className="table-controls">
            <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
            <div className="search-box"><label>Search:</label> <input type="search" /></div>
        </div>
        <div className="table-responsive-wrapper">
            <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Penghargaan</th><th>Oleh</th><th>No. SK</th><th>Tgl. SK</th><th>Tahun</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
                {dataRiwayatPenghargaan.map((item, index) => (
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
                        <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit', item)}><FaPencilAlt /></button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete', item)}><FaTrash /></button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="table-footer">
            <span>Showing 1 to {dataRiwayatPenghargaan.length} of {dataRiwayatPenghargaan.length} entries</span>
            <div className="pagination"></div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default RiwayatPenghargaan;