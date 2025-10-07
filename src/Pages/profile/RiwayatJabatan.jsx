// src/pages/profile/RiwayatJabatan.jsx (Diperbarui dengan Fitur Upload)

import React, { useState, useRef } from 'react'; // 1. Impor useState dan useRef
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
import { allRiwayatJabatan } from '../../_mock';
import Modal from '../../components/Modal';

const RiwayatJabatan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  
  // 2. Gunakan useRef untuk mengakses file input
  const fileInputRef = useRef(null);

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
    
    // Mengambil file yang dipilih dari input
    const file = fileInputRef.current.files[0];
    
    // Di aplikasi nyata, Anda akan handle file ini (misal, upload ke server)
    if (file) {
      console.log("File yang diupload:", file.name, file.size, "bytes");
      alert(`Berkas "${file.name}" siap diupload! (cek konsol)`);
    } else {
      console.log("Tidak ada file baru yang dipilih.");
      alert("Perubahan disimpan (tanpa mengubah berkas)! (cek konsol)");
    }
    
    // Lanjutkan logika penyimpanan data lainnya...
    console.log("Menyimpan perubahan untuk:", selectedData.id);
    handleCloseModal();
  };
  
  const handleDelete = () => {
    console.log("Menghapus data:", selectedData.id);
    alert("Data dihapus! (cek konsol)");
    handleCloseModal();
  };

  const renderModalContent = () => {
    if (modalType === 'edit' && selectedData) {
      return (
        <form onSubmit={handleSaveChanges}>
          <div className="modal-form-group">
            <label htmlFor="namaJabatan">Nama Jabatan</label>
            <input type="text" id="namaJabatan" defaultValue={selectedData.namaJabatan} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="noSk">No. SK</label>
            <input type="text" id="noSk" defaultValue={selectedData.noSk} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tglSk">Tgl. SK</label>
            <input type="text" id="tglSk" defaultValue={selectedData.tglSk} />
          </div>
          <div className="modal-form-group">
            <label htmlFor="tmtJabatan">TMT. Jabatan</label>
            <input type="text" id="tmtJabatan" defaultValue={selectedData.tmtJabatan} />
          </div>
          
          {/* --- 3. TAMBAHKAN INPUT FILE DI SINI --- */}
          <div className="modal-form-group">
            <label htmlFor="berkas">Upload Berkas SK (Opsional)</label>
            {/* Menampilkan nama berkas yang sudah ada (jika ada) */}
            <p className="current-file-info">
              Berkas saat ini: <a href={selectedData.berkasUrl} target="_blank" rel="noopener noreferrer">Lihat Berkas</a>
            </p>
            <input 
              type="file" 
              id="berkas" 
              ref={fileInputRef} // Hubungkan ref ke input ini
              accept=".pdf,.jpg,.jpeg,.png" // Batasi tipe file yang bisa diupload
            />
            <small className="form-text">Pilih berkas baru untuk menggantikan yang lama.</small>
          </div>
          
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      );
    }

    if (modalType === 'delete' && selectedData) {
      return (
        <div>
          <p>Anda yakin ingin menghapus riwayat jabatan:</p>
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
      {/* Konten lainnya (header, tabel) tidak berubah */}
      
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Jabatan</h3>
          <p className="subtitle">Informasi riwayat jabatan selama bekerja.</p>
        </div>
        <button className="add-button-icon">
          <FaPencilAlt />
        </button>
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
            {allRiwayatJabatan.map((item, index) => (
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={modalType === 'edit' ? 'Edit Riwayat Jabatan' : 'Konfirmasi Hapus'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default RiwayatJabatan;