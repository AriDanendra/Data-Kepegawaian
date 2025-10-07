import React, { useState } from 'react';
import './UbahPassword.css';

const UbahPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Reset pesan setiap kali submit

    // --- Validasi Sederhana ---
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

    // --- Logika Handle Ubah Password ---
    // Di aplikasi nyata, di sini Anda akan memanggil API untuk memvalidasi
    // password lama dan menyimpan password baru.
    console.log({
      oldPassword,
      newPassword,
    });

    // Simulasi berhasil
    setMessage({ type: 'success', text: 'Password berhasil diubah!' });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

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
