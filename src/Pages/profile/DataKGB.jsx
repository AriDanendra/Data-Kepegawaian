import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

const DataKGB = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL ---
  const context = useOutletContext();
  const data = propData || context?.riwayat?.kgb || [];

  // --- MODAL HANDLERS ---
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

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    
    if (modalType === 'add') {
      alert(`Data KGB baru dengan No. SK "${formData.noSk}" berhasil ditambahkan!`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data KGB dengan No. SK "${formData.noSk}" berhasil diperbarui!`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data KGB dengan No. SK "${selectedData.noSk}" telah dihapus!`);
    console.log("Menghapus data KGB:", selectedData);
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Data KGB';
    if (modalType === 'add') return 'Tambah Data KGB';
    return 'Konfirmasi Hapus';
  };
  
  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} required />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            <input type="text" id="tglSk" name="tglSk" value={formData.tglSk || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tmtKgb">TMT. KGB</label>
            <input type="text" id="tmtKgb" name="tmtKgb" value={formData.tmtKgb || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="gajiPokok">Gaji Pokok</label>
            <input type="text" id="gajiPokok" name="gajiPokok" value={formData.gajiPokok || ''} onChange={handleInputChange} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="masaKerja">Masa Kerja</label>
            <input type="text" id="masaKerja" name="masaKerja" value={formData.masaKerja || ''} onChange={handleInputChange} />
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
          <p>Anda yakin ingin menghapus data KGB dengan No. SK:</p>
          <p><strong>{selectedData.noSk}</strong>?</p>
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
            {data.map((item, index) => (
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
        <span>Showing 1 to {data.length} of {data.length} entries</span>
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