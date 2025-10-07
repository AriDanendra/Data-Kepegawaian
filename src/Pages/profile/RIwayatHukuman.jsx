// src/components/RiwayatHukuman/RiwayatHukuman.jsx (Kode yang Diperbaiki)

import React from 'react';
// 1. Impor data dari _mock.jsx
import { allRiwayatHukuman } from '../../_mock';

const RiwayatHukuman = () => {
  // 2. Data tiruan lokal dihapus dari sini

  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Hukuman Disiplin Pegawai</h3>
          <p className="subtitle">Informasi riwayat hukuman disiplin pegawai.</p>
        </div>
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
              <th>Nama Hukuman</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Hukuman</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Gunakan 'allRiwayatHukuman' */}
            {allRiwayatHukuman.length > 0 ? (
              allRiwayatHukuman.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.noSk}</td>
                  <td>{item.tglSk}</td>
                  <td>{item.tmt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {allRiwayatHukuman.length} of {allRiwayatHukuman.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
        <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatHukuman;