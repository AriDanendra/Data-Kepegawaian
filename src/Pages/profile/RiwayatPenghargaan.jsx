// src/components/RiwayatPenghargaan/RiwayatPenghargaan.jsx (Kode yang Diperbaiki)

import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// 1. Impor data dari _mock.jsx
import { allRiwayatPenghargaan } from '../../_mock';

const RiwayatPenghargaan = () => {
  // 2. Data tiruan lokal dihapus dari sini

  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Tanda Jasa/Penghargaan</h3>
          <p className="subtitle">Informasi riwayat tanda jasa/penghargaan.</p>
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
              <th>Nama Penghargaan</th>
              <th>Oleh</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>Tahun</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Gunakan 'allRiwayatPenghargaan' */}
            {allRiwayatPenghargaan.length > 0 ? (
              allRiwayatPenghargaan.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.oleh}</td>
                  <td>{item.noSk}</td>
                  <td>{item.tglSk}</td>
                  <td>{item.tahun}</td>
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
                <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatPenghargaan.length} of {allRiwayatPenghargaan.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPenghargaan;