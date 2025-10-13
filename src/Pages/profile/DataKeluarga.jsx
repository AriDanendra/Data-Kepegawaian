// src/Pages/profile/DataKeluarga.jsx (Kode Final dengan Modal Sukses)

import React, { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import SuccessModal from '../../components/SuccessModal'; // 1. Impor modal sukses
import { useAuth } from '../../context/AuthContext';

const DataKeluarga = ({ data: propData, employeeId: propEmployeeId }) => {
  const [keluargaData, setKeluargaData] = useState([]);
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
    const initialData = propData || context?.riwayat?.keluarga || [];
    setKeluargaData(initialData);
  }, [propData, context]);

  const dataSuamiIstri = keluargaData.filter(d => d.kategori === 'pasangan');
  const dataOrangTua = keluargaData.filter(d => d.kategori === 'orangtua');
  const dataAnak = keluargaData.filter(d => d.kategori === 'anak');

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    if (type.startsWith('edit')) {
      setSelectedData(data);
      setFormData(data);
    } else if (type.startsWith('add')) {
      setSelectedData(null);
      if (type === 'add-pasangan') setFormData({ kategori: 'pasangan', nama: '', ttl: '', tglKawin: '' });
      if (type === 'add-orangtua') setFormData({ kategori: 'orangtua', nama: '', status: '', ttl: '', alamat: '' });
      if (type === 'add-anak') setFormData({ kategori: 'anak', nama: '', ttl: '', pendidikan: '' });
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

    // 3. Fungsi untuk menampilkan modal sukses
  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setIsSuccessModalOpen(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (modalType.startsWith('add')) {
        const response = await axios.post(`http://localhost:3001/api/employees/${employeeId}/keluarga`, formData);
        setKeluargaData([...keluargaData, response.data]);
        showSuccessModal('Data keluarga baru berhasil ditambahkan!'); // 4. Ganti alert
      } else { // 'edit'
        const response = await axios.put(`http://localhost:3001/api/employees/${employeeId}/keluarga/${selectedData.id}`, formData);
        setKeluargaData(keluargaData.map(item => (item.id === selectedData.id ? response.data : item)));
        showSuccessModal('Data keluarga berhasil diperbarui!'); // 4. Ganti alert
      }
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menyimpan data keluarga:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeId}/keluarga/${selectedData.id}`);
      setKeluargaData(keluargaData.filter(item => item.id !== selectedData.id));
      showSuccessModal('Data keluarga berhasil dihapus!'); // 4. Ganti alert
      handleCloseModal();
    } catch (error) {
      console.error("Gagal menghapus data keluarga:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const getModalTitle = () => {
    if (modalType.startsWith('edit')) return 'Edit Data Keluarga';
    if (modalType.startsWith('add')) return 'Tambah Data Keluarga';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if (!formData && !selectedData) return null;

    if (modalType.includes('pasangan') && (modalType.startsWith('add') || modalType.startsWith('edit'))) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group"><label>Nama Suami / Istri</label><input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required /></div>
          <div className="modal-form-group"><label>Tempat, Tgl. Lahir</label><input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Tgl. Kawin</label><input type="text" name="tglKawin" placeholder="dd-mm-yyyy" value={formData.tglKawin || ''} onChange={handleInputChange} /></div>
          <div className="modal-form-group"><label>Upload Berkas (Buku Nikah)</label><input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      );
    }
    
    if (modalType.includes('orangtua') && (modalType.startsWith('add') || modalType.startsWith('edit'))) {
        return (
          <form onSubmit={handleSaveChanges}>
            <div className="modal-form-group"><label>Status</label><select name="status" value={formData.status || ''} onChange={handleInputChange} required><option value="" disabled>Pilih Status</option><option value="Bapak Kandung">Bapak Kandung</option><option value="Ibu Kandung">Ibu Kandung</option></select></div>
            <div className="modal-form-group"><label>Nama</label><input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required /></div>
            <div className="modal-form-group"><label>Tempat, Tgl. Lahir</label><input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} /></div>
            <div className="modal-form-group"><label>Alamat</label><input type="text" name="alamat" value={formData.alamat || ''} onChange={handleInputChange} /></div>
            <div className="modal-form-group"><label>Upload Berkas (Kartu Keluarga)</label><input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
            <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
          </form>
        );
      }
  
      if (modalType.includes('anak') && (modalType.startsWith('add') || modalType.startsWith('edit'))) {
        return (
          <form onSubmit={handleSaveChanges}>
            <div className="modal-form-group"><label>Nama Anak</label><input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required /></div>
            <div className="modal-form-group"><label>Tempat, Tgl. Lahir</label><input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} /></div>
            <div className="modal-form-group"><label>Pendidikan</label><input type="text" name="pendidikan" value={formData.pendidikan || ''} onChange={handleInputChange} /></div>
            <div className="modal-form-group"><label>Upload Berkas (Akta Lahir)</label><input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" /></div>
            <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
          </form>
        );
      }

    if (modalType.startsWith('delete-') && selectedData) {
      return (
        <div><p>Anda yakin ingin menghapus data: <strong>{selectedData.nama}</strong>?</p><div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button><button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button></div></div>
      );
    }
    return null;
  };

  return (
    <div className="data-keluarga-container">
      {/* --- TABEL SUAMI / ISTRI --- */}
      <div className="riwayat-container">
        <div className="riwayat-header"><h3>Suami / Istri</h3><button className="add-button-icon" title="Tambah Data Suami/Istri" onClick={() => handleOpenModal('add-pasangan')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama</th><th>TTL</th><th>Tgl. Kawin</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {dataSuamiIstri.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.nama}</td><td>{item.ttl}</td><td>{item.tglKawin}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-pasangan', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-pasangan', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TABEL ORANG TUA --- */}
      <div className="riwayat-container">
        <div className="riwayat-header"><h3>Ibu & Bapak Kandung</h3><button className="add-button-icon" title="Tambah Data Orang Tua" onClick={() => handleOpenModal('add-orangtua')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama</th><th>Status</th><th>TTL</th><th>Alamat</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {dataOrangTua.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.nama}</td><td>{item.status}</td><td>{item.ttl}</td><td>{item.alamat}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-orangtua', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-orangtua', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TABEL ANAK --- */}
      <div className="riwayat-container">
        <div className="riwayat-header"><h3>Anak</h3><button className="add-button-icon" title="Tambah Data Anak" onClick={() => handleOpenModal('add-anak')}><FaPencilAlt /></button></div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Nama</th><th>TTL</th><th>Pendidikan</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {dataAnak.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td><td>{item.nama}</td><td>{item.ttl}</td><td>{item.pendidikan}</td><td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td><div className="action-buttons"><button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-anak', item)}><FaPencilAlt /></button><button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-anak', item)}><FaTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default DataKeluarga;