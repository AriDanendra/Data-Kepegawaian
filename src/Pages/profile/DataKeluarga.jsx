import React from 'react';
import { FaPencilAlt, FaTrash, FaSync } from 'react-icons/fa';

// Data tiruan (kosong) untuk setiap tabel
const mockSuamiIstri = [];
const mockOrangTua = [];
const mockAnak = [];

const DataKeluarga = () => {
  return (
    <div className="data-keluarga-container">
      {/* --- 1. TABEL SUAMI / ISTRI --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Suami / Istri</h3>
            <p className="subtitle">Informasi suami / istri.</p>
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
                <th>Nama Suami / Istri</th>
                <th>Tempat, Tgl. Lahir</th>
                <th>Tgl. Kawin</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockSuamiIstri.length > 0 ? (
                mockSuamiIstri.map((item, index) => (
                  <tr key={item.id}>
                    {/* Data rows will go here */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No data available in table</td>
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

      {/* --- 2. TABEL IBU & BAPAK KANDUNG --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Ibu & Bapak Kandung</h3>
            <p className="subtitle">Informasi Ibu & Bapak Kandung.</p>
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
                <th>Nama</th>
                <th>Status</th>
                <th>Tempat, Tgl. Lahir</th>
                <th>Alamat</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockOrangTua.length > 0 ? (
                mockOrangTua.map((item, index) => (
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
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* --- 3. TABEL ANAK --- */}
      <div className="riwayat-container">
        <div className="riwayat-header">
          <div>
            <h3>Anak</h3>
            <p className="subtitle">Informasi Anak.</p>
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
                <th>Nama</th>
                <th>Tempat, Tgl. Lahir</th>
                <th>Pendidikan</th>
                <th>Berkas</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {mockAnak.length > 0 ? (
                mockAnak.map((item, index) => (
                  <tr key={item.id}>
                    {/* Data rows will go here */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No data available in table</td>
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

export default DataKeluarga;