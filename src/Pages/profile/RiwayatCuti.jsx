// src/Pages/profile/RiwayatCuti.jsx (Kode Final Terhubung Backend)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

const RiwayatCuti = ({ data: propData, employeeId: propEmployeeId }) => {
  const [cutiData, setCutiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  const { user } = useAuth();
  const context = useOutletContext();
  const employeeId = propEmployeeId || user.id;

  useEffect(() => {
    const initialData = propData || context?.riwayat?.cuti || [];
    setCutiData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(data);
      setFormData(data);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ jenisCuti: '', nomorSurat: '', tanggalSurat: '', tanggalAwal: '', tanggalSelesai: '' });
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
      if (modalType === 'add') {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/cuti`, formData);
        setCutiData([...cutiData, response.data]);
        alert(`Data cuti baru berhasil ditambahkan!`);
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/cuti/${selectedData.id}`, formData);
        setCutiData(cutiData.map(item => (item.id === selectedData.id ? response.data : item)));
        alert(`Data cuti berhasil diperbarui!`);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data cuti:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/cuti/${selectedData.id}`);
      setCutiData(cutiData.filter(item => item.id !== selectedData.id));
      alert(`Data cuti telah dihapus!`);
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data cuti:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Cuti';
    if (modalType === 'add') return 'Tambah Riwayat Cuti';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="jenisCuti">Jenis Cuti</label><input type="text" id="jenisCuti" name="jenisCuti" value={formData.jenisCuti || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="nomorSurat">Nomor Surat</label><input type="text" id="nomorSurat" name="nomorSurat" value={formData.nomorSurat || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tanggalSurat">Tanggal Surat</label><input type="text" id="tanggalSurat" placeholder="dd-mm-yyyy" name="tanggalSurat" value={formData.tanggalSurat || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tanggalAwal">Tanggal Awal</label><input type="text" id="tanggalAwal" placeholder="dd-mm-yyyy" name="tanggalAwal" value={formData.tanggalAwal || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tanggalSelesai">Tanggal Selesai</label><input type="text" id="tanggalSelesai" placeholder="dd-mm-yyyy" name="tanggalSelesai" value={formData.tanggalSelesai || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Surat Izin Cuti (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data cuti:</p>
          <p><strong>{selectedData.jenisCuti} ({selectedData.nomorSurat})</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div><h3>Riwayat Cuti</h3><p className="subtitle">Informasi Cuti.</p></div>
        <button className="add-button-icon" title="Tambah Riwayat Cuti" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
      </div>
      <div className="table-controls">
        <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
        <div className="search-box"><label>Search:</label> <input type="search" /></div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr><th>No</th><th>Jenis Cuti</th><th>Nomor Surat</th><th>Tanggal Surat</th><th>Tanggal Awal</th><th>Tanggal Selesai</th><th>Berkas</th><th>Opsi</th></tr>
          </thead>
          <tbody>
            {cutiData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.jenisCuti}</td>
                <td>{item.nomorSurat}</td>
                <td>{item.tanggalSurat}</td>
                <td>{item.tanggalAwal}</td>
                <td>{item.tanggalSelesai}</td>
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
      <div className="table-footer">
        <span>Showing 1 to {cutiData.length} of {cutiData.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default RiwayatCuti;