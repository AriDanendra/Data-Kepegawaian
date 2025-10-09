// src/pages/profile/RiwayatHukuman.jsx (Diubah ke type="text")

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// Dihapus: Helper functions untuk konversi format tanggal tidak lagi diperlukan
// const formatDateForInput = ...
// const formatDateForDisplay = ...


const RiwayatHukuman = ({ data: propData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  const context = useOutletContext();
  const data = propData || context?.riwayat?.hukuman || [];

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      // Diubah: Logika disederhanakan, tidak perlu konversi format
      setFormData(dataItem); 
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ nama: '', noSk: '', tglSk: '', tmt: '' }); 
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
    
    // Diubah: Logika disederhanakan, tidak perlu konversi format
    if (modalType === 'add') {
      alert(`Data hukuman baru "${formData.nama}" berhasil ditambahkan!`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data hukuman "${formData.nama}" berhasil diperbarui!`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data hukuman "${selectedData.nama}" telah dihapus!`);
    console.log("Menghapus data hukuman:", selectedData);
    handleCloseModal();
  };
  
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Hukuman';
    if (modalType === 'add') return 'Tambah Riwayat Humanan';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label>Nama Hukuman</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>No. SK</label>
            <input type="text" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>Tgl. SK</label>
            {/* Diubah: type="date" menjadi type="text" */}
            <input type="text" name="tglSk" placeholder="dd-mm-yyyy" value={formData.tglSk || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>TMT. Hukuman</label>
            {/* Diubah: type="date" menjadi type="text" */}
            <input type="text" name="tmt" placeholder="dd-mm-yyyy" value={formData.tmt || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Upload Berkas SK (Opsional)</label>
            <input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
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
          <p>Anda yakin ingin menghapus data hukuman disiplin:</p>
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
            <div><h3>Riwayat Hukuman Disiplin Pegawai</h3><p className="subtitle">Informasi riwayat hukuman disiplin pegawai.</p></div>
            <button className="add-button-icon" title="Tambah Hukuman" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
        </div>
        <div className="table-controls">
            <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
            <div className="search-box"><label>Search:</label> <input type="search" /></div>
        </div>
        <div className="table-responsive-wrapper">
            <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Hukuman</th><th>No. SK</th><th>Tgl. SK</th><th>TMT. Hukuman</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
                {data.map((item, index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.noSk}</td>
                    <td>{item.tglSk}</td>
                    <td>{item.tmt}</td>
                    <td><a href={item.berkasUrl || '#'} className="download-button">Download</a></td>
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
            <span>Showing 1 to {data.length} of {data.length} entries</span>
            <div className="pagination"></div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default RiwayatHukuman;