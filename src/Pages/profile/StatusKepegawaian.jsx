import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // Ikon untuk tombol

// Data tiruan untuk Status Kepegawaian, bisa diganti dengan data dari API
const mockStatusKepegawaian = [
  {
    id: 1,
    status: 'PNS',
    noSk: 'PN.821.12-76',
    tglSk: '27-02-1993',
    tmtJabatan: '01-03-1993',
    gol: 'IIa',
    pangkat: 'PENGATUR MUDA',
    berkasUrl: '/path/to/berkas-pns.pdf', // Ganti dengan path berkas yang sebenarnya
  },
  {
    id: 2,
    status: 'CPNS',
    noSk: 'PD.813.2-49',
    tglSk: '12-07-1990',
    tmtJabatan: '01-03-1990',
    gol: 'IIa',
    pangkat: 'PENGATUR MUDA',
    berkasUrl: '/path/to/berkas-cpns.pdf', // Ganti dengan path berkas yang sebenarnya
  },
];


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
            {mockStatusKepegawaian.map((item, index) => (
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
        <span>Showing 1 to {mockStatusKepegawaian.length} of {mockStatusKepegawaian.length} entries</span>
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