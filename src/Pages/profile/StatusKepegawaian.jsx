// src/Pages/profile/StatusKepegawaian.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

// Helper functions to handle date format conversion
const formatDateForInput = (dateStr) => {
  if (!dateStr || !/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return '';
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateStr) => {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

const StatusKepegawaian = ({ data: propData, employeeId: propEmployeeId }) => {
  const [statusData, setStatusData] = useState([]);
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
    const initialData = propData || context?.riwayat?.statusKepegawaian || [];
    setStatusData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      const formattedData = {
        ...dataItem,
        tglSk: formatDateForInput(dataItem.tglSk),
        tmtJabatan: formatDateForInput(dataItem.tmtJabatan),
      };
      setFormData(formattedData);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ status: '', noSk: '', tglSk: '', tmtJabatan: '', gol: '', pangkat: '' });
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
    const dataToSave = {
      ...formData,
      tglSk: formatDateForDisplay(formData.tglSk),
      tmtJabatan: formatDateForDisplay(formData.tmtJabatan),
    };

    try {
      if (modalType === 'add') {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/status`, dataToSave);
        setStatusData([...statusData, response.data]);
        showSuccessModal(`Data status baru berhasil ditambahkan!`); // 4. Ganti alert
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/status/${selectedData.id}`, dataToSave);
        setStatusData(statusData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal(`Data status berhasil diperbarui!`); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data status:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/status/${selectedData.id}`);
      setStatusData(statusData.filter(item => item.id !== selectedData.id));
      showSuccessModal(`Data status telah dihapus!`); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data status:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Status Kepegawaian';
    if (modalType === 'add') return 'Tambah Status Kepegawaian';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="status">Status Kepegawaian</label>
            <select id="status" name="status" value={formData.status || ''} onChange={handleInputChange} required>
                <option value="" disabled>Pilih Status</option>
                <option value="CPNS">CPNS</option><option value="PNS">PNS</option><option value="PPPK">PPPK</option>
                <option value="PTT">PTT</option><option value="BLUD">BLUD</option><option value="PKS">PKS</option>
            </select>
          </div>
          <div className="modal-form-group"><label htmlFor="noSk">No. SK</label><input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tglSk">Tgl. SK</label><input type="date" id="tglSk" name="tglSk" value={formData.tglSk || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tmtJabatan">TMT. Jabatan</label><input type="date" id="tmtJabatan" name="tmtJabatan" value={formData.tmtJabatan || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="gol">Golongan</label><input type="text" id="gol" name="gol" value={formData.gol || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="pangkat">Pangkat</label><input type="text" id="pangkat" name="pangkat" value={formData.pangkat || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Berkas SK (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data status:</p>
          <p><strong>{selectedData.status} ({selectedData.noSk})</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
        <div className="riwayat-header">
          <div><h3>Status Kepegawaian (CPNS/PNS, PPPK, PTT, BLUD, PKS)</h3><p className="subtitle">Informasi riwayat status kepegawaian.</p></div>
          <button className="add-button-icon" title="Tambah Status" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
        </div>
        <div className="table-controls">
          <div className="search-box"><label>Search:</label> <input type="search" /></div>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Status</th><th>No. SK</th><th>Tgl. SK</th><th>TMT. Jabatan</th><th>Gol</th><th>Pangkat</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {statusData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.status}</td>
                  <td>{item.noSk}</td>
                  <td>{item.tglSk}</td>
                  <td>{item.tmtJabatan}</td>
                  <td>{item.gol}</td>
                  <td>{item.pangkat}</td>
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

export default StatusKepegawaian;