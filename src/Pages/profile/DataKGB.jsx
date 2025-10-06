import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // Ikon untuk tombol

// Data tiruan untuk Riwayat KGB, bisa diganti dengan data dari API
const mockDataKGB = [
  {
    id: 1,
    noSk: '800.1.11.13/40/Umum&protokol',
    tglSk: '07-02-2023',
    tmtKgb: '01-03-2023',
    gajiPokok: 'Rp. 4.699.300',
    masaKerja: '28 Tahun',
    berkasUrl: '/path/to/berkas-kgb-1.pdf', // Ganti dengan path berkas yang sebenarnya
  },
  {
    id: 2,
    noSk: 'PD.822.4/288/BKPSDMD',
    tglSk: '10-02-2021',
    tmtKgb: '01-03-2021',
    gajiPokok: 'Rp. 4.555.800',
    masaKerja: '26 Tahun',
    berkasUrl: '/path/to/berkas-kgb-2.pdf', // Ganti dengan path berkas yang sebenarnya
  },
];

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
            {mockDataKGB.map((item, index) => (
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
        <span>Showing 1 to {mockDataKGB.length} of {mockDataKGB.length} entries</span>
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