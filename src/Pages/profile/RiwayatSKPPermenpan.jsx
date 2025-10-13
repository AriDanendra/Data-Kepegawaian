// src/Pages/profile/RiwayatSKPPermenpan.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

const RiwayatSKPPermenpan = ({ data: propData, employeeId: propEmployeeId }) => {
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
    const initialData = propData || context?.riwayat?.skpPermenpan || [];
    setSkpData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ tahun: '', predikatKinerja: '', hasilEvaluasi: '' });
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
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/skp-permenpan`, formData);
        setSkpData([...skpData, response.data]);
        showSuccessModal(`Data SKP Permenpan baru berhasil ditambahkan!`); // 4. Ganti alert
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/skp-permenpan/${selectedData.id}`, formData);
        setSkpData(skpData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal(`Data SKP Permenpan berhasil diperbarui!`); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data SKP Permenpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/skp-permenpan/${selectedData.id}`);
      setSkpData(skpData.filter(item => item.id !== selectedData.id));
      showSuccessModal(`Data SKP Permenpan telah dihapus!`); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data SKP Permenpan:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat SKP Permenpan';
    if (modalType === 'add') return 'Tambah Riwayat SKP Permenpan';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="tahun">Tahun</label><input type="number" id="tahun" name="tahun" value={formData.tahun || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="predikatKinerja">Predikat Kinerja</label><input type="text" id="predikatKinerja" name="predikatKinerja" value={formData.predikatKinerja || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="hasilEvaluasi">Hasil Evaluasi</label><input type="text" id="hasilEvaluasi" name="hasilEvaluasi" value={formData.hasilEvaluasi || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Berkas SKP (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data SKP Permenpan untuk tahun:</p>
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
        <div><h3>Riwayat SKP Permenpan</h3><p className="subtitle">Informasi riwayat SKP berdasarkan Permenpan.</p></div>
        <button className="add-button-icon" title="Tambah Data" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
      </div>
      <div className="table-controls">
        <div className="search-box"><label>Search:</label> <input type="search" /></div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr><th>#</th><th>Tahun</th><th>Predikat Kinerja</th><th>Hasil Evaluasi</th><th>Berkas</th><th>Opsi</th></tr>
          </thead>
          <tbody>
            {skpData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tahun}</td>
                <td>{item.predikatKinerja}</td>
                <td>{item.hasilEvaluasi}</td>
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
        message={successMessage}
      />
    </div>
  );
};

export default RiwayatSKPPermenpan;