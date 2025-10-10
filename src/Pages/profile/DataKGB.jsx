// src/Pages/profile/DataKGB.jsx (Kode Final yang Lengkap dan Diperbaiki)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

// 1. Terima 'employeeId' dari props
const DataKGB = ({ data: propData, employeeId: propEmployeeId }) => {
  const [kgbData, setKgbData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  const { user } = useAuth(); // User yang sedang login
  const context = useOutletContext(); // Data dari ProfilePage (saat pegawai login)

  // 2. Logika utama untuk menentukan ID pegawai yang datanya akan dikelola
  // Jika 'propEmployeeId' ada (diberikan oleh PegawaiDetailPage admin), gunakan itu.
  // Jika tidak, berarti pegawai sedang melihat profilnya sendiri, jadi gunakan 'user.id'.
  const employeeId = propEmployeeId || user.id;

  useEffect(() => {
    // Set data awal dari props atau context saat komponen pertama kali dimuat
    const initialData = propData || context?.riwayat?.kgb || [];
    setKgbData(initialData);
  }, [propData, context]);

  // --- MODAL HANDLERS (Tidak ada perubahan logika) ---
  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(data);
      setFormData(data);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ noSk: '', tglSk: '', tmtKgb: '', gajiPokok: '', masaKerja: '' });
    } else { // 'delete'
      setSelectedData(data);
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

  // --- FUNGSI INTERAKSI DENGAN BACKEND ---
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/kgb`, formData);
        setKgbData([...kgbData, response.data]);
        alert(`Data KGB baru berhasil ditambahkan!`);
      } else { // 'edit'
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/kgb/${selectedData.id}`, formData);
        setKgbData(kgbData.map(item => (item.id === selectedData.id ? response.data : item)));
        alert(`Data KGB berhasil diperbarui!`);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data KGB:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/kgb/${selectedData.id}`);
      setKgbData(kgbData.filter(item => item.id !== selectedData.id));
      alert(`Data KGB telah dihapus!`);
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data KGB:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  // --- FUNGSI RENDER KONTEN MODAL (Tidak ada perubahan logika) ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Data KGB';
    if (modalType === 'add') return 'Tambah Data KGB';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="noSk">No. SK</label><input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="tglSk">Tgl. SK</label><input type="text" id="tglSk" name="tglSk" placeholder="dd-mm-yyyy" value={formData.tglSk || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="tmtKgb">TMT. KGB</label><input type="text" id="tmtKgb" name="tmtKgb" placeholder="dd-mm-yyyy" value={formData.tmtKgb || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="gajiPokok">Gaji Pokok</label><input type="text" id="gajiPokok" name="gajiPokok" value={formData.gajiPokok || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="masaKerja">Masa Kerja</label><input type="text" id="masaKerja" name="masaKerja" value={formData.masaKerja || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Berkas SK (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data KGB dengan No. SK:</p>
          <p><strong>{selectedData.noSk}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  // --- Tampilan Komponen (JSX) ---
  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div>
          <h3>Riwayat KGB</h3>
          <p className="subtitle">Informasi riwayat KGB selama bekerja.</p>
        </div>
        <button className="add-button-icon" title="Tambah Data KGB" onClick={() => handleOpenModal('add')}>
          <FaPencilAlt />
        </button>
      </div>

      <div className="table-controls">
        <div className="show-entries">
          <label>Show</label> <select><option value="10">10</option></select> <span>entries</span>
        </div>
        <div className="search-box">
          <label>Search:</label> <input type="search" />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. KGB</th>
              <th>Gaji Pokok</th>
              <th>Masa Kerja</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {kgbData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmtKgb}</td>
                <td>{item.gajiPokok}</td>
                <td>{item.masaKerja}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
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
        <span>Showing 1 to {kgbData.length} of {kgbData.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default DataKGB;