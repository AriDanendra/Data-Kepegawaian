// src/components/DataKGB/DataKGB.jsx (Kode yang Diperbaiki)

import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// 1. PERBAIKAN: Impor 'allDataKGB' bukan 'mockDataKGB'
import { allDataKGB } from '../../_mock'; // Sesuaikan path jika perlu

const DataKGB = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat KGB</h3>
          <p className="subtitle">Informasi riwayat KGB selama bekerja.</p>
        </div>
        <button className="add-button-icon">
          <FaPencilAlt />
        </button>
      </div>

      {/* --- KONTROL TABEL (Tidak ada perubahan di sini) --- */}
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
            {/* 2. PERBAIKAN: Gunakan 'allDataKGB' untuk proses map */}
            {allDataKGB.map((item, index) => (
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
        {/* 3. PERBAIKAN: Gunakan 'allDataKGB.length' */}
        <span>Showing 1 to {allDataKGB.length} of {allDataKGB.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DataKGB;