// src/components/RiwayatOrganisasi/RiwayatOrganisasi.jsx (Kode yang Diperbaiki)

import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// 1. Impor data dari _mock.jsx
import { allRiwayatOrganisasi } from '../../_mock';

const RiwayatOrganisasi = () => {
  // 2. Data tiruan lokal dihapus dari sini

  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Keanggotaan Organisasi</h3>
          <p className="subtitle">Informasi riwayat keanggotaan organisasi.</p>
        </div>
        <button className="add-button-icon"><FaPencilAlt /></button>
      </div>

      {/* --- KONTROL TABEL --- */}
      <div className="table-controls">
        <div className="show-entries">
          <label>Show</label>
          <select><option value="10">10</option></select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <label>Search:</label>
          <input type="search" />
        </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="table-responsive-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Organisasi</th>
              <th>Jenis</th>
              <th>Jabatan</th>
              <th>Tempat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Gunakan 'allRiwayatOrganisasi' */}
            {allRiwayatOrganisasi.length > 0 ? (
              allRiwayatOrganisasi.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.jenis}</td>
                  <td>{item.jabatan}</td>
                  <td>{item.tempat}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit"><FaPencilAlt /></button>
                      <button className="action-btn delete" title="Delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatOrganisasi.length} of {allRiwayatOrganisasi.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatOrganisasi;