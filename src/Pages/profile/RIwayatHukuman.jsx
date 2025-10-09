import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// Terima 'data' sebagai prop dengan nama alias 'propData'
const RiwayatHukuman = ({ data: propData }) => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete'
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  
  // --- LOGIKA PENGAMBILAN DATA FLEKSIBEL ---
  const context = useOutletContext();
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const data = propData || context?.riwayat?.hukuman || [];

  // --- MODAL HANDLERS ---
  const handleOpenModal = (type, dataItem = null) => {
    setModalType(type);
    if (type === 'edit') {
      setSelectedData(dataItem);
      // Inisialisasi formData dengan data yang ada untuk diedit
      setFormData(dataItem); 
    } else if (type === 'add') {
      setSelectedData(null);
      // Inisialisasi formData untuk data baru
      setFormData({ nama: '', noSk: '', tglSk: '', tmt: '' }); 
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
    
    if (modalType === 'add') {
      alert(`Data hukuman baru "${formData.nama}" berhasil ditambahkan!`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data hukuman "${formData.nama}" berhasil diperbarui!`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    // TODO: Di aplikasi nyata, lakukan dispatch action untuk update state/API call di sini.
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data hukuman "${selectedData.nama}" telah dihapus!`);
    console.log("Menghapus data hukuman:", selectedData);
    // TODO: Di aplikasi nyata, lakukan dispatch action untuk hapus data/API call di sini.
    handleCloseModal();
  };
  
  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Hukuman';
    if (modalType === 'add') return 'Tambah Riwayat Hukuman';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          {/* Form Group untuk Nama Hukuman */}
          <div className="modal-form-group">
            <label>Nama Hukuman</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleInputChange} required />
          </div>
          
          {/* Form Group untuk No. SK */}
          <div className="modal-form-group">
            <label>No. SK</label>
            <input type="text" name="noSk" value={formData.noSk || ''} onChange={handleInputChange} required />
          </div>
          
          {/* Form Group untuk Tgl. SK */}
          <div className="modal-form-group">
            <label>Tgl. SK</label>
            <input type="date" name="tglSk" value={formData.tglSk || ''} onChange={handleInputChange} required />
          </div>
          
          {/* Form Group untuk TMT. Hukuman */}
          <div className="modal-form-group">
            <label>TMT. Hukuman</label>
            {/* Menggunakan type="date" untuk input tanggal yang lebih baik, meskipun data asli menggunakan string biasa */}
            <input type="date" name="tmt" value={formData.tmt || ''} onChange={handleInputChange} />
          </div>
          
          {/* Form Group untuk Upload Berkas */}
          <div className="modal-form-group">
            <label>Upload Berkas SK (Opsional)</label>
            <input type="file" ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          
          {/* Tombol Aksi */}
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
          <p>Anda yakin ingin menghapus data hukuman disiplin:</p>
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
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Hukuman Disiplin Pegawai</h3>
          <p className="subtitle">Informasi riwayat hukuman disiplin pegawai.</p>
        </div>
        {/* Tombol 'Tambah' yang memanggil handleOpenModal('add') */}
        <button className="add-button-icon" title="Tambah Hukuman" onClick={() => handleOpenModal('add')}>
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
              <th>Nama Hukuman</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Hukuman</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* Menggunakan 'data' yang sudah fleksibel */}
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmt}</td>
                <td>
                  <a href={item.berkasUrl || '#'} className="download-button">Download</a>
                </td>
                <td>
                  <div className="action-buttons">
                    {/* Tombol Edit */}
                    <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit', item)}><FaPencilAlt /></button>
                    {/* Tombol Delete */}
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
          {/* ... */}
        </div>
      </div>

      {/* Komponen Modal */}
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

export default RiwayatHukuman;