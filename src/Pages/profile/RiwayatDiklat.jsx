// src/Pages/profile/RiwayatDiklat.jsx (Kode Final Terhubung Backend)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

const RiwayatDiklat = ({ data: propData, employeeId: propEmployeeId }) => {
  const [diklatData, setDiklatData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  const { user } = useAuth();
  const context = useOutletContext();
  const employeeId = propEmployeeId || user.id;

  useEffect(() => {
    const initialData = propData || context?.riwayat?.diklat || [];
    setDiklatData(initialData);
  }, [propData, context]);

  // Filter data berdasarkan state lokal
  const diklatStruktural = diklatData.filter(d => d.jenis === 'struktural');
  const diklatFungsional = diklatData.filter(d => d.jenis === 'fungsional');
  const diklatTeknis = diklatData.filter(d => d.jenis === 'teknis');

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    if (type.startsWith('edit')) {
      setSelectedData(data);
      setFormData(data);
    } else if (type.startsWith('add')) {
      setSelectedData(null);
      const jenisDiklat = type.split('-')[1]; 
      setFormData({ jenis: jenisDiklat, namaDiklat: '', tempat: '', pelaksana: '', angkatan: '', tanggal: '' });
    } else {
      setSelectedData(data);
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
      if (modalType.startsWith('add')) {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/diklat`, formData);
        setDiklatData([...diklatData, response.data]);
        alert(`Data diklat baru berhasil ditambahkan!`);
      } else { // 'edit'
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/diklat/${selectedData.id}`, formData);
        setDiklatData(diklatData.map(item => (item.id === selectedData.id ? response.data : item)));
        alert(`Data diklat berhasil diperbarui!`);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data diklat:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/diklat/${selectedData.id}`);
      setDiklatData(diklatData.filter(item => item.id !== selectedData.id));
      alert(`Data diklat telah dihapus!`);
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data diklat:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };
  
  const getModalTitle = () => {
    if (modalType.startsWith('edit')) return 'Edit Riwayat Diklat';
    if (modalType.startsWith('add')) return 'Tambah Riwayat Diklat';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if ((modalType.startsWith('edit-') || modalType.startsWith('add-')) && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label>Jenis Diklat</label>
            <select name="jenis" value={formData.jenis || ''} onChange={handleInputChange} disabled={modalType.startsWith('add-')} required>
                <option value="struktural">Struktural</option>
                <option value="fungsional">Fungsional</option>
                <option value="teknis">Teknis</option>
            </select>
          </div>
          <div className="modal-form-group"><label>Nama Diklat</label><input type="text" name="namaDiklat" value={formData.namaDiklat || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label>Tempat</label><input type="text" name="tempat" value={formData.tempat || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Pelaksana</label><input type="text" name="pelaksana" value={formData.pelaksana || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Angkatan</label><input type="text" name="angkatan" value={formData.angkatan || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Tanggal</label><input type="text" name="tanggal" placeholder="dd-mm-yyyy" value={formData.tanggal || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Upload Sertifikat (Opsional)</label><input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType.startsWith('delete-') && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data diklat:</p>
          <p><strong>{selectedData.namaDiklat}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-diklat-container">
      {/* --- TABEL DIKLAT STRUKTURAL --- */}
      <div className="riwayat-container">
        <div className="riwayat-header"><h3>Riwayat Diklat Struktural</h3><button className="add-button-icon" title="Tambah Diklat Struktural" onClick={() => handleOpenModal('add-struktural')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {diklatStruktural.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.namaDiklat}</td><td>{item.tempat}</td><td>{item.pelaksana}</td><td>{item.angkatan}</td><td>{item.tanggal}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-struktural', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-struktural', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TABEL DIKLAT FUNGSIONAL --- */}
      <div className="riwayat-container">
      <div className="riwayat-header"><h3>Riwayat Diklat Fungsional</h3><button className="add-button-icon" title="Tambah Diklat Fungsional" onClick={() => handleOpenModal('add-fungsional')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {diklatFungsional.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.namaDiklat}</td><td>{item.tempat}</td><td>{item.pelaksana}</td><td>{item.angkatan}</td><td>{item.tanggal}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-fungsional', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-fungsional', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TABEL DIKLAT TEKNIS --- */}
      <div className="riwayat-container">
      <div className="riwayat-header"><h3>Riwayat Diklat Teknis</h3><button className="add-button-icon" title="Tambah Diklat Teknis" onClick={() => handleOpenModal('add-teknis')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {diklatTeknis.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.namaDiklat}</td><td>{item.tempat}</td><td>{item.pelaksana}</td><td>{item.angkatan}</td><td>{item.tanggal}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-teknis', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-teknis', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default RiwayatDiklat;