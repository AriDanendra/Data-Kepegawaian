// src/Pages/profile/RiwayatSKP.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

const RiwayatSKP = ({ data: propData, employeeId: propEmployeeId }) => {
  const [skpData, setSkpData] = useState([]);
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
    const initialData = propData || context?.riwayat?.skp || [];
    setSkpData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ tahun: '', nilaiSKP: '', nilaiPerilaku: '', nilaiPrestasi: '' });
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
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/skp`, formData);
        setSkpData([...skpData, response.data]);
        showSuccessModal(`Data SKP baru berhasil ditambahkan!`); // 4. Ganti alert
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/skp/${selectedData.id}`, formData);
        setSkpData(skpData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal(`Data SKP berhasil diperbarui!`); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data SKP:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/skp/${selectedData.id}`);
      setSkpData(skpData.filter(item => item.id !== selectedData.id));
      showSuccessModal(`Data SKP telah dihapus!`); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data SKP:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat SKP';
    if (modalType === 'add') return 'Tambah Riwayat SKP';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="tahun">Tahun</label><input type="number" id="tahun" name="tahun" value={formData.tahun || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="nilaiSKP">Nilai SKP</label><input type="number" step="0.01" id="nilaiSKP" name="nilaiSKP" value={formData.nilaiSKP || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="nilaiPerilaku">Nilai Perilaku</label><input type="number" step="0.01" id="nilaiPerilaku" name="nilaiPerilaku" value={formData.nilaiPerilaku || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="nilaiPrestasi">Nilai Prestasi</label><input type="number" step="0.01" id="nilaiPrestasi" name="nilaiPrestasi" value={formData.nilaiPrestasi || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Berkas SKP (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data SKP untuk tahun:</p>
          <p><strong>{selectedData.tahun}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div><h3>Riwayat SKP</h3><p className="subtitle">Informasi riwayat SKP.</p></div>
        <button className="add-button-icon" title="Tambah Riwayat SKP" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
      </div>
      <div className="table-controls">
        <div className="search-box"><label>Search:</label> <input type="search" /></div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr><th>#</th><th>Tahun</th><th>Nilai SKP</th><th>Nilai Perilaku</th><th>Nilai Prestasi</th><th>Berkas</th><th>Opsi</th></tr>
          </thead>
          <tbody>
            {skpData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tahun}</td>
                <td>{item.nilaiSKP}</td>
                <td>{item.nilaiPerilaku}</td>
                <td>{item.nilaiPrestasi}</td>
                <td><a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">Download</a></td>
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
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>

      {/* 5. Tambahkan komponen modal sukses di sini */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => window.location.reload()}
        message={successMessage}
      />
    </div>
  );
};

export default RiwayatSKP;