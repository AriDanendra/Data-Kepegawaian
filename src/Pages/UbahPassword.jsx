// src/pages/UbahPassword.jsx (Disesuaikan dengan AuthContext)

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ditambahkan: Import useAuth
import axios from 'axios';
import './UbahPassword.css';

const UbahPassword = () => {
  // Ditambahkan: Ambil data user yang sedang login dari context
  const { user, updateUser } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validasi Sederhana (tetap sama)
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Semua kolom harus diisi.' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password baru minimal harus 8 karakter.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Konfirmasi password baru tidak cocok.' });
      return;
    }
    
    if (oldPassword !== user.password) {
        setMessage({ type: 'error', text: 'Password lama yang Anda masukkan salah.' });
        return;
    }

    try {
        const response = await axios.post('http://localhost:3001/api/auth/change-password', {
            userId: user.id,
            oldPassword,
            newPassword,
            role: user.role
        });

        // Perbarui password di state lokal setelah berhasil
        updateUser({ ...user, password: newPassword });

        setMessage({ type: 'success', text: response.data.message });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

    } catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Terjadi kesalahan' });
    }
  };

  // Ditambahkan: Pengaman jika user belum termuat (misalnya saat refresh halaman)
  if (!user) {
    return <div className="ubah-password-container">Memuat data pengguna...</div>;
  }

  return (
    <div className="ubah-password-container">
      <div className="ubah-password-header">
        <h2>Ubah Password</h2>
        <p className="subtitle">
          Untuk keamanan akun, mohon untuk tidak memberitahukan password Anda kepada siapapun.
        </p>
      </div>
      <div className="ubah-password-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Password Lama</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Password Baru</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password Baru</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="submit-btn">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default UbahPassword;