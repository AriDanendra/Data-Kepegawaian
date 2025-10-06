import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

// Data tiruan (kosong) untuk setiap jenis diklat
const mockDiklatStruktural = [];
const mockDiklatFungsional = [];
const mockDiklatTeknis = [];

const RiwayatDiklat = () => {
  return (
    <div className="riwayat-diklat-container">
      {/* --- 1. TABEL DIKLAT STRUKTURAL --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Riwayat Diklat Struktural</h3>
            <p className="subtitle">Informasi riwayat diklat struktural.</p>
          </div>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
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
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Diklat</th>
                <th>Tempat</th>
                <th>Pelaksana</th>
                <th>Angkatan</th>
                <th>Tanggal</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockDiklatStruktural.length > 0 ? (
                mockDiklatStruktural.map((item, index) => (
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
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* --- 2. TABEL DIKLAT FUNGSIONAL --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Riwayat Diklat Fungsional</h3>
            <p className="subtitle">Informasi riwayat diklat fungsional.</p>
          </div>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
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
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Diklat</th>
                <th>Tempat</th>
                <th>Pelaksana</th>
                <th>Angkatan</th>
                <th>Tanggal</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockDiklatFungsional.length > 0 ? (
                mockDiklatFungsional.map((item, index) => (
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
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* --- 3. TABEL DIKLAT TEKNIS --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Riwayat Diklat Teknis</h3>
            <p className="subtitle">Informasi riwayat diklat teknis.</p>
          </div>
          <button className="add-button-icon"><FaPencilAlt /></button>
        </div>
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
        <div className="table-responsive-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Diklat</th>
                <th>Tempat</th>
                <th>Pelaksana</th>
                <th>Angkatan</th>
                <th>Tanggal</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockDiklatTeknis.length > 0 ? (
                mockDiklatTeknis.map((item, index) => (
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
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatDiklat;
