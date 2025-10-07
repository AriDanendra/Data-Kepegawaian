import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// 1. Impor 'allStatusKepegawaian' dari file _mock.jsx
import { allStatusKepegawaian } from '../../_mock'; // Sesuaikan path jika perlu

// 2. Data tiruan lokal (mockStatusKepegawaian) dihapus dari sini

const StatusKepegawaian = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Status Kepegawaian (PNS/CPNS)</h3>
          <p className="subtitle">Informasi status pegawai.</p>
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
              <th>Status</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Jabatan</th>
              <th>Gol</th>
              <th>Pangkat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Gunakan 'allStatusKepegawaian' untuk mapping */}
            {allStatusKepegawaian.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.status}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmtJabatan}</td>
                <td>{item.gol}</td>
                <td>{item.pangkat}</td>
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
        {/* 4. Gunakan 'allStatusKepegawaian.length' */}
        <span>Showing 1 to {allStatusKepegawaian.length} of {allStatusKepegawaian.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StatusKepegawaian;