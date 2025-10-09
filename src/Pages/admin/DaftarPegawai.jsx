import React from 'react';
// Menambahkan FaPlus dan FaIdCard untuk ikon baru di card
import { FaEye, FaPencilAlt, FaTrash, FaPlus, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import allEmployees from '../../_mock';
import './DaftarPegawai.css'; // File CSS tidak perlu diubah

const DaftarPegawai = () => {
  const navigate = useNavigate();

  const handleOpenDetail = (employeeId) => {
    navigate(`/admin/pegawai/detail/${employeeId}`);
  };

  return (
    <div className="riwayat-container">
      
      {/* --- Bagian Header Halaman --- */}
      <div className="riwayat-header">
        <div>
          <h3>Manajemen Daftar Pegawai</h3>
          <p className="subtitle">Kelola data master semua pegawai.</p>
        </div>
        {/* Mengganti tombol ikon menjadi tombol dengan teks agar lebih jelas */}
        <button className="btn-tambah-pegawai" title="Tambah Pegawai Baru">
          <FaPlus style={{ marginRight: '8px' }} />
          Tambah Pegawai
        </button>
      </div>

      {/* --- Kontrol Tabel (Pencarian & Entri) --- */}
      {/* Bagian ini tetap sama karena fungsionalitasnya masih relevan */}
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

      {/* --- Tampilan Grid Kartu Pegawai --- */}
      {/* Mengganti <table> dengan <div> untuk grid kartu */}
      <div className="pegawai-card-grid">
        {allEmployees.map((employee) => (
          // Setiap pegawai ditampilkan dalam satu kartu
          <div key={employee.id} className="pegawai-item-card profile-content-card">
            
            {/* Header Kartu: Foto, Nama, dan NIP */}
            <div className="pegawai-card-header">
              <img src={employee.profilePictureUrl} alt={employee.name} className="pegawai-foto-card" />
              <div className="pegawai-details">
                <h4 className="employee-name">{employee.name}</h4>
                <p className="pegawai-nip-card">
                  <FaIdCard className="icon-detail" /> {employee.nip.split(' / ')[1]}
                </p>
              </div>
            </div>

            {/* Body Kartu: Informasi Jabatan dan Golongan */}
            <div className="pegawai-card-body">
              <div className="detail-item">
                <span className="detail-label">Jabatan:</span>
                <span className="detail-value">{employee.jabatan}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Golongan:</span>
                <span className="detail-value">{employee.golongan}</span>
              </div>
            </div>

            {/* Aksi Kartu: Tombol Detail, Edit, dan Hapus */}
            <div className="card-action-buttons">
              <button
                className="action-btn view"
                title="Lihat Detail Profil"
                onClick={() => handleOpenDetail(employee.id)}
              >
                <FaEye /> Detail
              </button>
              <button className="action-btn edit" title="Edit Pegawai">
                <FaPencilAlt /> Edit
              </button>
              <button className="action-btn delete" title="Hapus Pegawai">
                <FaTrash /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* --- Footer (Info Entri & Paginasi) --- */}
      {/* Bagian ini juga tetap sama */}
      <div className="table-footer">
        <span>Showing 1 to {allEmployees.length} of {allEmployees.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

    </div>
  );
};

export default DaftarPegawai;