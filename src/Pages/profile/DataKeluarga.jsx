// src/pages/profile/DataKeluarga.jsx (Final dengan Kontrol Tabel di setiap bagian)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allDataKeluarga } from '../../_mock';
import Modal from '../../components/Modal';

const DataKeluarga = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  // --- DATA FILTERING ---
  const dataSuamiIstri = allDataKeluarga.filter(d => d.kategori === 'pasangan');
  const dataOrangTua = allDataKeluarga.filter(d => d.kategori === 'orangtua');
  const dataAnak = allDataKeluarga.filter(d => d.kategori === 'anak');

  // --- MODAL HANDLERS (Tidak ada perubahan) ---
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

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    
    if (modalType.startsWith('add')) {
      alert(`Data baru "${formData.nama}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data untuk "${formData.nama}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data untuk "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data:", selectedData);
    handleCloseModal();
  };
  
  // --- DYNAMIC CONTENT RENDERING (Tidak ada perubahan) ---
  const getModalTitle = () => {
    if (modalType.startsWith('edit')) return 'Edit Data Keluarga';
    if (modalType.startsWith('add')) return 'Tambah Data Keluarga';
    if (modalType.startsWith('delete')) return 'Konfirmasi Hapus Data';
    return 'Modal';
  };

  const renderModalContent = () => {
    if (!formData && (modalType.startsWith('edit') || modalType.startsWith('add'))) return null;

    if (modalType.includes('pasangan')) {
      return (
        <form onSubmit={handleSaveChanges}>
          {/* ... isi form pasangan ... */}
          <div className="modal-form-group">
            <label>Nama Suami / Istri</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>Tempat, Tgl. Lahir</label>
            <input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Tgl. Kawin</label>
            <input type="text" name="tglKawin" value={formData.tglKawin || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Upload Berkas (Buku Nikah)</label>
            <input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      );
    }
    
    if (modalType.includes('orangtua')) {
      return (
        <form onSubmit={handleSaveChanges}>
          {/* ... isi form orang tua ... */}
          <div className="modal-form-group">
            <label>Status</label>
            <select name="status" value={formData.status || ''} onChange={handleInputChange} required>
              <option value="" disabled>Pilih Status</option>
              <option value="Bapak Kandung">Bapak Kandung</option>
              <option value="Ibu Kandung">Ibu Kandung</option>
            </select>
          </div>
          <div className="modal-form-group">
            <label>Nama</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>Tempat, Tgl. Lahir</label>
            <input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Alamat</label>
            <input type="text" name="alamat" value={formData.alamat || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Upload Berkas (Kartu Keluarga)</label>
            <input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      );
    }

    if (modalType.includes('anak')) {
      return (
        <form onSubmit={handleSaveChanges}>
          {/* ... isi form anak ... */}
          <div className="modal-form-group">
            <label>Nama Anak</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label>Tempat, Tgl. Lahir</label>
            <input type="text" name="ttl" value={formData.ttl || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Pendidikan</label>
            <input type="text" name="pendidikan" value={formData.pendidikan || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label>Upload Berkas (Akta Lahir)</label>
            <input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      );
    }

    if (modalType.startsWith('delete-') && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data:</p>
          <p><strong>{selectedData.nama}</strong>?</p>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="data-keluarga-container">
      {/* --- 1. TABEL SUAMI / ISTRI --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
            <h3>Suami / Istri</h3>
            <button className="add-button-icon" title="Tambah Data Suami/Istri" onClick={() => handleOpenModal('add-pasangan')}>
                <FaPencilAlt />
            </button>
        </div>
        {/* === PENAMBAHAN KONTROL TABEL === */}
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
              <tr><th>#</th><th>Nama</th><th>TTL</th><th>Tgl. Kawin</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataSuamiIstri.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.ttl}</td>
                  <td>{item.tglKawin}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-pasangan', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-pasangan', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 2. TABEL IBU & BAPAK KANDUNG --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Ibu & Bapak Kandung</h3>
          <button className="add-button-icon" title="Tambah Data Orang Tua" onClick={() => handleOpenModal('add-orangtua')}>
            <FaPencilAlt />
          </button>
        </div>
         {/* === PENAMBAHAN KONTROL TABEL === */}
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
              <tr><th>#</th><th>Nama</th><th>Status</th><th>TTL</th><th>Alamat</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataOrangTua.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.status}</td>
                  <td>{item.ttl}</td>
                  <td>{item.alamat}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-orangtua', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-orangtua', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. TABEL ANAK --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Anak</h3>
          <button className="add-button-icon" title="Tambah Data Anak" onClick={() => handleOpenModal('add-anak')}>
            <FaPencilAlt />
          </button>
        </div>
         {/* === PENAMBAHAN KONTROL TABEL === */}
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
              <tr><th>#</th><th>Nama</th><th>TTL</th><th>Pendidikan</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataAnak.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.ttl}</td>
                  <td>{item.pendidikan}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-anak', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-anak', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* --- RENDER MODAL --- */}
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

export default DataKeluarga;