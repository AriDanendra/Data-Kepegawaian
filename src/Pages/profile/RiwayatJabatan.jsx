import React from 'react';
import { FaPencilAlt, FaSync, FaTrash } from 'react-icons/fa'; // Ikon untuk tombol

// Data tiruan untuk Riwayat Jabatan, bisa diganti dengan data dari API
const mockRiwayatJabatan = [
  {
    id: 1,
    namaJabatan: 'Kepala Bagian Ketatausahaan, Humas dan Hukum',
    noSk: '829 TAHUN 2023',
    tglSk: '30-10-2023',
    tmtJabatan: '30-10-2023',
    berkasUrl: '/path/to/berkas-1.pdf',
  },
  {
    id: 2,
    namaJabatan: 'Kepala Sub Bagian Rumah Tangga dan Perlengkapan',
    noSk: '140 TAHUN 2022',
    tglSk: '25-03-2022',
    tmtJabatan: '25-03-2022',
    berkasUrl: '/path/to/berkas-2.pdf',
  },
  {
    id: 3,
    namaJabatan: 'PENYUSUN RENCANA KEBUTUHAN RUMAH TANGGA DAN PERLENGKAPAN',
    noSk: '16 Tahun 2022',
    tglSk: '13-01-2022',
    tmtJabatan: '13-01-2022',
    berkasUrl: '/path/to/berkas-3.pdf',
  },
  {
    id: 4,
    namaJabatan: 'PENGADMINISTRASI PENERIMAAN',
    noSk: '864 Tahun 2020',
    tglSk: '09-09-2020',
    tmtJabatan: '09-09-2020',
    berkasUrl: '/path/to/berkas-4.pdf',
  },
];

const RiwayatJabatan = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Jabatan</h3>
          <p className="subtitle">Informasi riwayat jabatan selama bekerja.</p>
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
              <th>Nama Jabatan</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Jabatan</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatJabatan.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.namaJabatan}</td>
                <td>{item.noSk}</td>
                <td>{item.tglSk}</td>
                <td>{item.tmtJabatan}</td>
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
        <span>Showing 1 to {mockRiwayatJabatan.length} of {mockRiwayatJabatan.length} entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatJabatan;