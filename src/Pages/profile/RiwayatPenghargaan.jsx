import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

// Data tiruan (kosong) untuk Riwayat Penghargaan
const mockRiwayatPenghargaan = [];

const RiwayatPenghargaan = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Tanda Jasa/Penghargaan</h3>
          <p className="subtitle">Informasi riwayat tanda jasa/penghargaan.</p>
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
              <th>Nama Penghargaan</th>
              <th>Oleh</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>Tahun</th>
              <th>Berkas</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatPenghargaan.length > 0 ? (
              mockRiwayatPenghargaan.map((item, index) => (
                <tr key={item.id}>
                  {/* Data rows will go here */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
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

export default RiwayatPenghargaan;