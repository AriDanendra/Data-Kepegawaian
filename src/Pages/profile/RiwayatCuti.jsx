import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

// Data tiruan untuk Riwayat Cuti
const mockRiwayatCuti = [
  {
    id: 1,
    jenisCuti: 'Cuti Tahunan',
    nomorSurat: '800/139/BKPSDMD',
    tanggalSurat: '22-01-2025',
    tanggalAwal: '03-02-2025',
    tanggalSelesai: '18-02-2025',
    berkasUrl: '/path/to/berkas-cuti.pdf', // Ganti dengan path berkas yang sebenarnya
  },
];

const RiwayatCuti = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Cuti</h3>
          <p className="subtitle">Informasi Cuti.</p>
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
              <th>No</th>
              <th>Jenis Cuti</th>
              <th>Nomor Surat</th>
              <th>Tanggal Surat</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Selesai</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatCuti.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.jenisCuti}</td>
                <td>{item.nomorSurat}</td>
                <td>{item.tanggalSurat}</td>
                <td>{item.tanggalAwal}</td>
                <td>{item.tanggalSelesai}</td>
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
        <span>Showing 1 to {mockRiwayatCuti.length} of {mockRiwayatCuti.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatCuti;