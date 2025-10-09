// src/pages/profile/StatusKepegawaian.jsx (Diperbaiki)

import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// Ditambahkan: Helper functions untuk konversi format tanggal
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};


const StatusKepegawaian = ({ data: propData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  const context = useOutletContext();
  const dataStatusKepegawaian = propData || context?.riwayat?.statusKepegawaian || [];

  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      // Diubah: Konversi tanggal saat membuka modal edit
      const formattedData = {
        ...dataItem,
        tglSk: formatDateForInput(dataItem.tglSk),
        tmtJabatan: formatDateForInput(dataItem.tmtJabatan),
      };
      setFormData(formattedData);
    } else if (type === 'add') {
      setSelectedData(null);
      setFormData({ status: '', noSk: '', tglSk: '', tmtJabatan: '', gol: '', pangkat: '' });
    } else { // 'delete'
      setSelectedData(dataItem);
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
    
    // Diubah: Konversi tanggal kembali saat menyimpan data
    const dataToSave = {
      ...formData,
      tglSk: formatDateForDisplay(formData.tglSk),
      tmtJabatan: formatDateForDisplay(formData.tmtJabatan),
    };

    if (modalType === 'add') {
      alert(`Data status baru "${dataToSave.status}" berhasil ditambahkan! (cek konsol)`);
      console.log("Menambahkan data baru:", { ...dataToSave, file });
    } else { // 'edit'
      alert(`Data status "${dataToSave.status}" berhasil diperbarui! (cek konsol)`);
      console.log("Memperbarui data:", { ...dataToSave, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data status "${selectedData.status}" telah dihapus! (cek konsol)`);
    console.log("Menghapus data status:", selectedData);
    handleCloseModal();
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
                <option value="CPNS">CPNS</option>
                <option value="PNS">PNS</option>
                <option value="PPPK">PPPK</option>
                <option value="PTT">PTT</option>
                <option value="BLUD">BLUD</option>
                <option value="PKS">PKS</option>
            </select>
          </div>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            <input type="date" id="tglSk" name="tglSk" value={formData.tglSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tmtJabatan">TMT. Jabatan</label>
            <input type="date" id="tmtJabatan" name="tmtJabatan" value={formData.tmtJabatan || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="gol">Golongan</label>
            <input type="text" id="gol" name="gol" value={formData.gol || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="pangkat">Pangkat</label>
            <input type="text" id="pangkat" name="pangkat" value={formData.pangkat || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SK (Opsional)</label>
            <input type="file" id="berkas" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus data status:</p>
          <p><strong>{selectedData.status} ({selectedData.noSk})</strong>?</p>
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
    <div className="riwayat-container">
        {/* ... sisa kode JSX tidak berubah ... */}
        <div className="riwayat-header">
          <div><h3>Status Kepegawaian (CPNS/PNS, PPPK, PTT, BLUD, PKS)</h3><p className="subtitle">Informasi riwayat status kepegawaian.</p></div>
          <button className="add-button-icon" title="Tambah Status" onClick={() => handleOpenModal('add')}><FaPencilAlt /></button>
        </div>
        <div className="table-controls">
          <div className="show-entries"><label>Show</label> <select><option value="10">10</option></select> <span>entries</span></div>
          <div className="search-box"><label>Search:</label> <input type="search" /></div>
        </div>
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead><tr><th>#</th><th>Status</th><th>No. SK</th><th>Tgl. SK</th><th>TMT. Jabatan</th><th>Gol</th><th>Pangkat</th><th>Berkas</th><th>Opsi</th></tr></thead>
            <tbody>
              {dataStatusKepegawaian.map((item, index) => (
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
        <div className="table-footer">
          <span>Showing 1 to {dataStatusKepegawaian.length} of {dataStatusKepegawaian.length} entries</span>
          <div className="pagination"></div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={getModalTitle()}>{renderModalContent()}</Modal>
    </div>
  );
};

export default StatusKepegawaian;