import React from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa'; // Ikon untuk tombol

// Data tiruan untuk Riwayat SKP, Anda bisa menggantinya dengan data dari API
const mockRiwayatSKP = [
  {
    id: 1,
    tahun: 2021,
    nilaiSKP: 123,
    nilaiPerilaku: 91.9,
    nilaiPrestasi: 87.2,
    berkasUrl: '/path/to/berkas-skp-2021.pdf', // Ganti dengan path berkas yang sebenarnya
  },
  {
    id: 2,
    tahun: 2022,
    nilaiSKP: 125,
    nilaiPerilaku: 93.5,
    nilaiPrestasi: 88.0,
    berkasUrl: '/path/to/berkas-skp-2022.pdf',
  },
];

const RiwayatSKP = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat SKP</h3>
          <p className="subtitle">Informasi riwayat SKP.</p>
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
              <th>Tahun</th>
              <th>Nilai SKP</th>
              <th>Nilai Perilaku</th>
              <th>Nilai Prestasi</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatSKP.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tahun}</td>
                <td>{item.nilaiSKP}</td>
                <td>{item.nilaiPerilaku}</td>
                <td>{item.nilaiPrestasi}</td>
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
        <span>Showing 1 to {mockRiwayatSKP.length} of {mockRiwayatSKP.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatSKP;