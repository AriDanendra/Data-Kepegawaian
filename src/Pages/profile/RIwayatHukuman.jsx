// src/Pages/profile/RIwayatHukuman.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

const RiwayatHukuman = ({ data: propData, employeeId: propEmployeeId }) => {
  const [hukumanData, setHukumanData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  // 2. State untuk mengontrol modal sukses
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { user } = useAuth();
  const context = useOutletContext();
  const employeeId = propEmployeeId || user.id;

  useEffect(() => {
    const initialData = propData || context?.riwayat?.hukuman || [];
    setHukumanData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem); 
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ nama: '', noSk: '', tglSk: '', tmt: '' }); 
    } else {
      setSelectedData(dataItem);
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Fungsi untuk menampilkan modal sukses
  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setIsSuccessModalOpen(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/hukuman`, formData);
        setHukumanData([...hukumanData, response.data]);
        showSuccessModal(`Data hukuman baru berhasil ditambahkan!`); // 4. Ganti alert
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/hukuman/${selectedData.id}`, formData);
        setHukumanData(hukumanData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal(`Data hukuman berhasil diperbarui!`); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data hukuman:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/hukuman/${selectedData.id}`);
      setHukumanData(hukumanData.filter(item => item.id !== selectedData.id));
      showSuccessModal(`Data hukuman telah dihapus!`); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data hukuman:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };
  
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Hukuman';
    if (modalType === 'add') return 'Tambah Riwayat Hukuman';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label>Nama Hukuman</label><input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label>No. SK</label><input type="text" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label>Tgl. SK</label><input type="text" name="tglSk" placeholder="dd-mm-yyyy" value={formData.tglSk || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label>TMT. Hukuman</label><input type="text" name="tmt" placeholder="dd-mm-yyyy" value={formData.tmt || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Upload Berkas SK (Opsional)</label><input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data hukuman disiplin:</p>
          <p><strong>{selectedData.nama}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
        <div className="riwayat-header">
            <div><h3>Riwayat Hukuman Disiplin Pegawai</h3><p className="subtitle">Informasi riwayat hukuman disiplin pegawai.</p></div>
            <button className="add-button-icon" title="Tambah Hukuman" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
        </div>
        <div className="table-controls">
            <div className="search-box"><label>Search:</label> <input type="search" /></div>
        </div>
        <div className="table-responsive-wrapper">
            <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Hukuman</th><th>No. SK</th><th>Tgl. SK</th><th>TMT. Hukuman</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
                {hukumanData.map((item, index) => (
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
            <span>Showing 1 to {hukumanData.length} of {hukumanData.length} entries</span>
            <div className="pagination"></div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
        
        {/* 5. Tambahkan komponen modal sukses di sini */}
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          message={successMessage}
        />
    </div>
  );
};

export default RiwayatHukuman;