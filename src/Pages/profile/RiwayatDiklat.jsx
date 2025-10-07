// src/pages/profile/RiwayatDiklat.jsx (Diperbarui dengan Fitur Modal)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { allRiwayatDiklat } from '../../_mock';
import Modal from '../../components/Modal'; // 1. Impor komponen Modal

const RiwayatDiklat = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // Cth: 'edit-struktural'
  const [selectedData, setSelectedData] = useState(null);
  const fileInputRef = useRef(null);

  // --- DATA FILTERING ---
  const diklatStruktural = allRiwayatDiklat.filter(d => d.jenis === 'struktural');
  const diklatFungsional = allRiwayatDiklat.filter(d => d.jenis === 'fungsional');
  const diklatTeknis = allRiwayatDiklat.filter(d => d.jenis === 'teknis');

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
      alert(`Sertifikat diklat "${file.name}" siap diupload! (cek konsol)`);
      console.log("File baru:", file);
    } else {
      alert("Data diklat disimpan tanpa mengubah berkas! (cek konsol)");
    }
    console.log("Menyimpan data diklat:", selectedData);
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data diklat "${selectedData.namaDiklat}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data diklat:", selectedData);
    handleCloseModal();
  };
  
  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType.startsWith('edit')) return 'Edit Riwayat Diklat';
    if (modalType.startsWith('delete')) return 'Konfirmasi Hapus Data';
    return 'Modal';
  };

  const renderModalContent = () => {
    // Satu form bisa digunakan untuk semua jenis diklat karena field-nya sama
    if (modalType.startsWith('edit-') && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label>Jenis Diklat</label>
            <input type="text" value={selectedData.jenis.charAt(0).toUpperCase() + selectedData.jenis.slice(1)} readOnly />
          </div>
          <div className="modal-form-group">
            <label>Nama Diklat</label>
            <input type="text" defaultValue={selectedData.namaDiklat} />
          </div>
          <div className="modal-form-group">
            <label>Tempat</label>
            <input type="text" defaultValue={selectedData.tempat} />
          </div>
          <div className="modal-form-group">
            <label>Pelaksana</label>
            <input type="text" defaultValue={selectedData.pelaksana} />
          </div>
           <div className="modal-form-group">
            <label>Angkatan</label>
            <input type="text" defaultValue={selectedData.angkatan} />
          </div>
           <div className="modal-form-group">
            <label>Tanggal</label>
            <input type="text" defaultValue={selectedData.tanggal} />
          </div>
          <div className="modal-form-group">
            <label>Upload Sertifikat (Opsional)</label>
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
          <p>Anda yakin ingin menghapus data diklat:</p>
          <p><strong>{selectedData.namaDiklat}</strong>?</p>
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
    <div className="riwayat-diklat-container">
      {/* --- 1. TABEL DIKLAT STRUKTURAL --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Riwayat Diklat Struktural</h3>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
             <thead>
               <tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {diklatStruktural.length > 0 ? diklatStruktural.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.namaDiklat}</td>
                  <td>{item.tempat}</td>
                  <td>{item.pelaksana}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tanggal}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-struktural', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-struktural', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              )) : (<tr><td colSpan="8" style={{ textAlign: 'center' }}>No data available</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 2. TABEL DIKLAT FUNGSIONAL --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <h3>Riwayat Diklat Fungsional</h3>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
             <thead>
               <tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {diklatFungsional.length > 0 ? diklatFungsional.map((item, index) => (
                <tr key={item.id}>
                   <td>{index + 1}</td>
                   <td>{item.namaDiklat}</td>
                   <td>{item.tempat}</td>
                   <td>{item.pelaksana}</td>
                   <td>{item.angkatan}</td>
                   <td>{item.tanggal}</td>
                   <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                   <td>
                     <div className="action-buttons">
                       <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-fungsional', item)}><FaPencilAlt /></button>
                       <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-fungsional', item)}><FaTrash /></button>
                     </div>
                   </td>
                </tr>
              )) : (<tr><td colSpan="8" style={{ textAlign: 'center' }}>No data available</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. TABEL DIKLAT TEKNIS --- */}
      <div className="riwayat-container">
         <div className="riwayat-header">
          <h3>Riwayat Diklat Teknis</h3>
           <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
               <tr><th>#</th><th>Nama Diklat</th><th>Tempat</th><th>Pelaksana</th><th>Angkatan</th><th>Tanggal</th><th>Berkas</th><th>Opsi</th></tr>
            </thead>
            <tbody>
              {diklatTeknis.length > 0 ? diklatTeknis.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.namaDiklat}</td>
                  <td>{item.tempat}</td>
                  <td>{item.pelaksana}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tanggal}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit-teknis', item)}><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete-teknis', item)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              )) : (<tr><td colSpan="8" style={{ textAlign: 'center' }}>No data available</td></tr>)}
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

export default RiwayatDiklat;