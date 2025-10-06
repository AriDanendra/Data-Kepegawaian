import React from 'react';
import { mockRiwayatPendidikan } from '../../_mock';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa'; // Ikon untuk tombol

const RiwayatPendidikan = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Pendidikan</h3>
          <p className="subtitle">Informasi riwayat pendidikan.</p>
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
            <th>Nama Sekolah</th>
            <th>Jurusan</th>
            <th>Lokasi</th>
            <th>No. Ijazah</th>
            <th>Lulus</th>
            <th>Berkas</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {mockRiwayatPendidikan.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.namaSekolah}</td>
              <td>{item.jurusan}</td>
              <td>{item.lokasi}</td>
              <td>{item.noIjazah}</td>
              <td>{item.lulus}</td>
              <td>
                <a href={item.berkasUrl} className="download-button">Download</a>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn refresh"><FaSync /></button>
                  <button className="action-btn edit"><FaPencilAlt /></button>
                  <button className="action-btn delete"><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 1 to {mockRiwayatPendidikan.length} of {mockRiwayatPendidikan.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPendidikan;