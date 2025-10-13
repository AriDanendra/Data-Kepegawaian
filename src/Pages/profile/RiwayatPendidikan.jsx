// src/Pages/profile/RiwayatPendidikan.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

const RiwayatPendidikan = ({ data: propData, employeeId: propEmployeeId }) => {
  const [pendidikanData, setPendidikanData] = useState([]);
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
    const initialData = propData || context?.riwayat?.pendidikan || [];
    setPendidikanData(initialData);
  }, [propData, context]);

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      setFormData(dataItem);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ namaSekolah: '', jurusan: '', lokasi: '', noIjazah: '', lulus: '' });
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
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/pendidikan`, formData);
        setPendidikanData([...pendidikanData, response.data]);
        showSuccessModal(`Data pendidikan baru berhasil ditambahkan!`); // 4. Ganti alert
      } else {
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/pendidikan/${selectedData.id}`, formData);
        setPendidikanData(pendidikanData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal(`Data pendidikan berhasil diperbarui!`); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data pendidikan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/pendidikan/${selectedData.id}`);
      setPendidikanData(pendidikanData.filter(item => item.id !== selectedData.id));
      showSuccessModal(`Data pendidikan telah dihapus!`); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data pendidikan:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Pendidikan';
    if (modalType === 'add') return 'Tambah Riwayat Pendidikan';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label htmlFor="namaSekolah">Nama Sekolah</label><input type="text" id="namaSekolah" name="namaSekolah" value={formData.namaSekolah || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label htmlFor="jurusan">Jurusan</label><input type="text" id="jurusan" name="jurusan" value={formData.jurusan || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="lokasi">Lokasi</label><input type="text" id="lokasi" name="lokasi" value={formData.lokasi || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="noIjazah">No. Ijazah</label><input type="text" id="noIjazah" name="noIjazah" value={formData.noIjazah || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="lulus">Tahun Lulus</label><input type="text" id="lulus" name="lulus" value={formData.lulus || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label htmlFor="berkas">Upload Ijazah (Opsional)</label><input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data pendidikan:</p>
          <p><strong>{selectedData.namaSekolah} - Jurusan {selectedData.jurusan}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div><h3>Riwayat Pendidikan</h3><p className="subtitle">Informasi riwayat pendidikan.</p></div>
        <button className="add-button-icon" title="Tambah Riwayat Pendidikan" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
      </div>
      <div className="table-controls">
        <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
        <div className="search-box"><label>Search:</label> <input type="search" /></div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr><th>#</th><th>Nama Sekolah</th><th>Jurusan</th><th>Lokasi</th><th>No. Ijazah</th><th>Lulus</th><th>Berkas</th><th>Opsi</th></tr>
          </thead>
          <tbody>
            {pendidikanData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.namaSekolah}</td>
                <td>{item.jurusan}</td>
                <td>{item.lokasi}</td>
                <td>{item.noIjazah}</td>
                <td>{item.lulus}</td>
                <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn refresh" title="Refresh"><FaSync /></button>
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
        <span>Showing 1 to {pendidikanData.length} of {pendidikanData.length} entries</span>
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

export default RiwayatPendidikan;