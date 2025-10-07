// src/pages/profile/DataKeluarga.jsx (Kode yang Diperbarui)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allDataKeluarga } from '../../_mock';
import Modal from '../../components/Modal'; // Impor komponen Modal

const DataKeluarga = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // Cth: 'edit-pasangan', 'delete-anak'
  const [selectedData, setSelectedData] = useState(null);
  const fileInputRef = useRef(null);

  // --- DATA FILTERING ---
  const dataSuamiIstri = allDataKeluarga.filter(d => d.kategori === 'pasangan');
  const dataOrangTua = allDataKeluarga.filter(d => d.kategori === 'orangtua');
  const dataAnak = allDataKeluarga.filter(d => d.kategori === 'anak');

  // --- MODAL HANDLERS ---
  const handleOpenModal = (type, data) => {
    setModalType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedData(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    if (file) {
      alert(`Berkas "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data untuk "${selectedData.nama}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data:", selectedData);
    handleCloseModal();
  };
  
  // --- DYNAMIC CONTENT RENDERING ---

  // Fungsi untuk mendapatkan judul modal secara dinamis
  const getModalTitle = () => {
    if (modalType.startsWith('edit')) return 'Edit Data Keluarga';
    if (modalType.startsWith('delete')) return 'Konfirmasi Hapus Data';
    return 'Modal';
  };

  // Fungsi untuk merender form atau konten di dalam modal
  const renderModalContent = () => {
    // Form untuk Suami/Istri
    if (modalType === 'edit-pasangan' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label>Nama Suami / Istri</label>
            <input type="text" defaultValue={selectedData.nama} />
          </div>
          <div className="modal-form-group">
            <label>Tempat, Tgl. Lahir</label>
            <input type="text" defaultValue={selectedData.ttl} />
          </div>
          <div className="modal-form-group">
            <label>Tgl. Kawin</label>
            <input type="text" defaultValue={selectedData.tglKawin} />
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

    // Form untuk Orang Tua
    if (modalType === 'edit-orangtua' && selectedData) {
        return (
          <form onSubmit={handleSaveChanges}>
            <div className="modal-form-group">
              <label>Nama</label>
              <input type="text" defaultValue={selectedData.nama} />
            </div>
            <div className="modal-form-group">
              <label>Status</label>
              <input type="text" defaultValue={selectedData.status} readOnly />
            </div>
             <div className="modal-form-group">
              <label>Tempat, Tgl. Lahir</label>
              <input type="text" defaultValue={selectedData.ttl} />
            </div>
            <div className="modal-form-group">
              <label>Alamat</label>
              <input type="text" defaultValue={selectedData.alamat} />
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

    // Form untuk Anak
    if (modalType === 'edit-anak' && selectedData) {
        return (
          <form onSubmit={handleSaveChanges}>
            <div className="modal-form-group">
              <label>Nama Anak</label>
              <input type="text" defaultValue={selectedData.nama} />
            </div>
            <div className="modal-form-group">
              <label>Tempat, Tgl. Lahir</label>
              <input type="text" defaultValue={selectedData.ttl} />
            </div>
            <div className="modal-form-group">
              <label>Pendidikan</label>
              <input type="text" defaultValue={selectedData.pendidikan} />
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

    // Konfirmasi Hapus (berlaku untuk semua)
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

  // --- JSX RENDER ---
  return (
    <div className="data-keluarga-container">
      {/* --- 1. TABEL SUAMI / ISTRI --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
            <h3>Suami / Istri</h3>
            <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr><th>#</th><th>Nama</th><th>TTL</th><th>Tgl. Kawin</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataSuamiIstri.length > 0 ? dataSuamiIstri.map((item, index) => (
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
              )) : (<tr><td colSpan="6" className="text-center">No data</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 2. TABEL IBU & BAPAK KANDUNG --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Ibu & Bapak Kandung</h3>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr><th>#</th><th>Nama</th><th>Status</th><th>TTL</th><th>Alamat</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataOrangTua.length > 0 ? dataOrangTua.map((item, index) => (
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
              )) : (<tr><td colSpan="7" className="text-center">No data</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. TABEL ANAK --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Anak</h3>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr><th>#</th><th>Nama</th><th>TTL</th><th>Pendidikan</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {dataAnak.length > 0 ? dataAnak.map((item, index) => (
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
              )) : (<tr><td colSpan="6" className="text-center">No data</td></tr>)}
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