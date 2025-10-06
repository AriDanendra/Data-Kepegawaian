import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

// Data tiruan (kosong) untuk Riwayat Keanggotaan Organisasi
const mockRiwayatOrganisasi = [];

const RiwayatOrganisasi = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Keanggotaan Organisasi</h3>
          <p className="subtitle">Informasi riwayat keanggotaan organisasi.</p>
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
              <th>Nama Organisasi</th>
              <th>Jenis</th>
              <th>Jabatan</th>
              <th>Tempat</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatOrganisasi.length > 0 ? (
              mockRiwayatOrganisasi.map((item, index) => (
                <tr key={item.id}>
                  {/* Data rows will go here */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- FOOTER TABEL --- */}
      <div className="table-footer">
        <span>Showing 0 to 0 of 0 entries</span>
        <div className="pagination">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatOrganisasi;