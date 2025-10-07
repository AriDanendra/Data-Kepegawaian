import React from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa';
// 1. Impor 'allRiwayatJabatan' dari file _mock.jsx
import { allRiwayatJabatan } from '../../_mock'; // Sesuaikan path jika perlu

// 2. Data tiruan lokal (mockRiwayatJabatan) dihapus dari sini

const RiwayatJabatan = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Jabatan</h3>
          <p className="subtitle">Informasi riwayat jabatan selama bekerja.</p>
        </div>
        <button className="add-button-icon">
          <FaPencilAlt />
        </button>
      </div>

      {/* --- KONTROL TABEL --- */}
      <div className="table-controls">
        <div className="show-entries">
          <label htmlFor="entries">Show</label>
          <select name="entries" id="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <label htmlFor="search">Search:</label>
          <input type="search" id="search" />
        </div>
      </div>

      {/* --- TABEL DATA --- */}
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
            {/* 3. Gunakan 'allRiwayatJabatan' untuk mapping */}
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
                    <button className="action-btn edit" title="Edit"><FaPencilAlt /></button>
                    <button className="action-btn delete" title="Delete"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        {/* 4. Gunakan 'allRiwayatJabatan.length' */}
        <span>Showing 1 to {allRiwayatJabatan.length} of {allRiwayatJabatan.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatJabatan;