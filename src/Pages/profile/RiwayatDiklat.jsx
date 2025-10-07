// src/components/RiwayatDiklat/RiwayatDiklat.jsx (Kode yang Diperbaiki)

import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// 1. Impor satu sumber data utama dari _mock.jsx
import { allRiwayatDiklat } from '../../_mock';

const RiwayatDiklat = () => {
  // 2. Hapus mock data lokal

  // 3. Filter data utama menjadi tiga kategori berbeda
  const diklatStruktural = allRiwayatDiklat.filter(d => d.jenis === 'struktural');
  const diklatFungsional = allRiwayatDiklat.filter(d => d.jenis === 'fungsional');
  const diklatTeknis = allRiwayatDiklat.filter(d => d.jenis === 'teknis');

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
        {/* Kontrol dan Tabel sekarang menggunakan 'diklatStruktural' */}
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
              {diklatStruktural.length > 0 ? (
                diklatStruktural.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.namaDiklat}</td>
                  <td>{item.tempat}</td>
                  <td>{item.pelaksana}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tanggal}</td>
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
                  <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
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
        {/* Kontrol dan Tabel sekarang menggunakan 'diklatFungsional' */}
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
              {diklatFungsional.length > 0 ? (
                diklatFungsional.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.namaDiklat}</td>
                  <td>{item.tempat}</td>
                  <td>{item.pelaksana}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tanggal}</td>
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
                  <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
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
        {/* Kontrol dan Tabel sekarang menggunakan 'diklatTeknis' */}
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
              {diklatTeknis.length > 0 ? (
                diklatTeknis.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                  <td>{item.namaDiklat}</td>
                  <td>{item.tempat}</td>
                  <td>{item.pelaksana}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tanggal}</td>
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
                  <td colSpan="8" style={{ textAlign: 'center' }}>No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatDiklat;