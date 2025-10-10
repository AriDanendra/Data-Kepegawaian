// src/Pages/profile/RiwayatOrganisasi.jsx (Kode Final Terhubung Backend)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

const RiwayatOrganisasi = ({ data: propData, employeeId: propEmployeeId }) => {
  const [organisasiData, setOrganisasiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  const { user } = useAuth();
  const context = useOutletContext();
  const employeeId = propEmployeeId || user.id;

  useEffect(() => {
    const initialData = propData || context?.riwayat?.organisasi || [];
    setOrganisasiData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ nama: '', jenis: '', jabatan: '', tempat: '' });
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

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/organisasi`, formData);
        setOrganisasiData([...organisasiData, response.data]);
        alert(`Data organisasi baru berhasil ditambahkan!`);
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/organisasi/${selectedData.id}`, formData);
        setOrganisasiData(organisasiData.map(item => (item.id === selectedData.id ? response.data : item)));
        alert(`Data organisasi berhasil diperbarui!`);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data organisasi:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/organisasi/${selectedData.id}`);
      setOrganisasiData(organisasiData.filter(item => item.id !== selectedData.id));
      alert(`Data organisasi telah dihapus!`);
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data organisasi:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Organisasi';
    if (modalType === 'add') return 'Tambah Riwayat Organisasi';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="nama">Nama Organisasi</label><input type="text" id="nama" name="nama" value={formData.nama || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="jenis">Jenis</label><input type="text" id="jenis" name="jenis" value={formData.jenis || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="jabatan">Jabatan</label><input type="text" id="jabatan" name="jabatan" value={formData.jabatan || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tempat">Tempat</label><input type="text" id="tempat" name="tempat" value={formData.tempat || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Berkas Keanggotaan (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data organisasi:</p>
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
        <div><h3>Riwayat Keanggotaan Organisasi</h3><p className="subtitle">Informasi riwayat keanggotaan organisasi.</p></div>
        <button className="add-button-icon" title="Tambah Organisasi" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
      </div>
      <div className="table-controls">
        <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
        <div className="search-box"><label>Search:</label> <input type="search" /></div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr><th>#</th><th>Nama Organisasi</th><th>Jenis</th><th>Jabatan</th><th>Tempat</th><th>Berkas</th><th>Opsi</th></tr>
          </thead>
          <tbody>
            {organisasiData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>{item.jabatan}</td>
                <td>{item.tempat}</td>
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
        <span>Showing 1 to {organisasiData.length} of {organisasiData.length} entries</span>
        <div className="pagination"></div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default RiwayatOrganisasi;