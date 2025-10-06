import React from 'react';

// Data tiruan (kosong) untuk Riwayat Hukuman
const mockRiwayatHukuman = [];

const RiwayatHukuman = () => {
  return (
    <div className="riwayat-container">
      {/* --- HEADER --- */}
      <div className="riwayat-header">
        <div>
          <h3>Riwayat Hukuman Disiplin Pegawai</h3>
          <p className="subtitle">Informasi riwayat hukuman disiplin pegawai.</p>
        </div>
        {/* Tombol edit dihilangkan sesuai gambar */}
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
              <th>Nama Hukuman</th>
              <th>No. SK</th>
              <th>Tgl. SK</th>
              <th>TMT. Hukuman</th>
            </tr>
          </thead>
          <tbody>
            {mockRiwayatHukuman.length > 0 ? (
              mockRiwayatHukuman.map((item, index) => (
                <tr key={item.id}>
                  {/* Data rows will go here */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No data available in table</td>
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

export default RiwayatHukuman;