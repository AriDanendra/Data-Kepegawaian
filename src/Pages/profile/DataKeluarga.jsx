// src/components/DataKeluarga/DataKeluarga.jsx (Kode yang Diperbaiki)

import React from 'react';
import { FaPencilAlt, FaTrash, FaSync } from 'react-icons/fa';
// 1. Impor data utama dari _mock.jsx
import { allDataKeluarga } from '../../_mock';

const DataKeluarga = () => {
  // 2. Filter data utama menjadi tiga kategori
  const dataSuamiIstri = allDataKeluarga.filter(d => d.kategori === 'pasangan');
  const dataOrangTua = allDataKeluarga.filter(d => d.kategori === 'orangtua');
  const dataAnak = allDataKeluarga.filter(d => d.kategori === 'anak');

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
              {dataSuamiIstri.length > 0 ? (
                dataSuamiIstri.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.ttl}</td>
                  <td>{item.tglKawin}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit"><FaPencilAlt /></button>
                      <button className="action-btn delete"><FaTrash /></button>
                    </div>
                  </td>
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
              {dataOrangTua.length > 0 ? (
                dataOrangTua.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.status}</td>
                  <td>{item.ttl}</td>
                  <td>{item.alamat}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit"><FaPencilAlt /></button>
                      <button className="action-btn delete"><FaTrash /></button>
                    </div>
                  </td>
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
              {dataAnak.length > 0 ? (
                dataAnak.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.ttl}</td>
                  <td>{item.pendidikan}</td>
                  <td><a href={item.berkasUrl} className="download-button">Download</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit"><FaPencilAlt /></button>
                      <button className="action-btn delete"><FaTrash /></button>
                    </div>
                  </td>
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
      </div>
    </div>
  );
};

export default DataKeluarga;