import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/Modal';

// Terima 'data' sebagai prop dengan nama alias 'propData'
const RiwayatJabatan = ({ data: propData }) => {
  // Coba ambil context dari Outlet (untuk halaman profil)
  const context = useOutletContext();

  // LOGIKA UTAMA: Pengambilan Data Fleksibel
  // Prioritaskan propData, fallback ke context, lalu ke array kosong.
  const data = propData || context?.riwayat?.jabatan || [];

  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete'
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

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
      setFormData({ namaJabatan: '', noSk: '', tglSk: '', tmtJabatan: '' });
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
      alert(`Data jabatan baru "${formData.namaJabatan}" berhasil ditambahkan!`);
      console.log("Menambahkan data baru:", { ...formData, file });
    } else { // 'edit'
      alert(`Data jabatan "${formData.namaJabatan}" berhasil diperbarui!`);
      console.log("Memperbarui data:", { ...formData, file });
    }
    // TODO: Di aplikasi nyata, lakukan dispatch action/API call di sini.
    handleCloseModal();
  };

  const handleDelete = () => {
    alert(`Data jabatan "${selectedData.namaJabatan}" telah dihapus!`);
    console.log("Menghapus data jabatan:", selectedData);
    // TODO: Di aplikasi nyata, lakukan dispatch action/API call di sini.
    handleCloseModal();
  };

  // --- DYNAMIC CONTENT RENDERING ---
  const getModalTitle = () => {
    if (modalType === 'edit') return 'Edit Riwayat Jabatan';
    if (modalType === 'add') return 'Tambah Riwayat Jabatan';
    return 'Konfirmasi Hapus Data';
  };

  const renderModalContent = () => {
    if ((modalType === 'edit' || modalType === 'add') && formData) {
      return (
        <form onSubmit={handleSaveChanges}>
          {/* Form Group untuk Nama Jabatan */}
          <div className="modal-form-group">
            <label>Nama Jabatan</label>
            <input type="text" name="namaJabatan" value={formData.namaJabatan || ''} onChange={handleInputChange} required />
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

          {/* Form Group untuk TMT. Jabatan */}
          <div className="modal-form-group">
            <label>TMT. Jabatan</label>
            <input type="date" name="tmtJabatan" value={formData.tmtJabatan || ''} onChange={handleInputChange} />
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
          <p>Anda yakin ingin menghapus data jabatan:</p>
          <p><strong>{selectedData.namaJabatan}</strong>?</p>
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
          <h3>Riwayat Jabatan</h3>
          <p className="subtitle">Informasi riwayat jabatan selama bekerja.</p>
        </div>
        <button className="add-button-icon" title="Tambah Riwayat Jabatan" onClick={() => handleOpenModal('add')}>
          <FaPencilAlt />
        </button>
      </div>

      <div className="table-controls">
        <div className="show-entries">
          <label htmlFor="entries">Show</label>
          <select name="entries" id="entries"><option value="10">10</option></select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <label htmlFor="search">Search:</label>
          <input type="search" id="search" />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Jabatan</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Jabatan</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* 'data' sekarang dijamin selalu ada dan berupa array */}
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.namaJabatan}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmtJabatan}</td>
                <td>
                  <a href={item.berkasUrl} className="download-button" target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn refresh" title="Refresh"><FaSync /></button>
                    <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal('edit', item)}>
                      <FaPencilAlt />
                    </button>
                    <button className="action-btn delete" title="Delete" onClick={() => handleOpenModal('delete', item)}>
                      <FaTrash />
                    </button>
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

export default RiwayatJabatan;