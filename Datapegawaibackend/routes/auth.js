import { Router } from 'express';
import jwt from 'jsonwebtoken';
import pool, { fetchAllRiwayat } from '../db.js'; // Impor koneksi database

const router = Router();
const JWT_SECRET = 'your-secret-key';

// Fungsi untuk login (FIXED)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password diperlukan' });
  }

  try {
    // Kueri mencari berdasarkan 'nip'. Untuk admin, NIP-nya adalah 'admin'.
    const [users] = await pool.query('SELECT * FROM users WHERE nip = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const user = users[0];

    // Cek password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }
    
    // Hapus password dari objek user sebelum dikirim sebagai respons
    delete user.password;
    
    // Jika bukan admin, ambil data riwayatnya
    if (user.role === 'pegawai') {
        user.riwayat = await fetchAllRiwayat(user.id);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      message: `Login sebagai ${user.role} berhasil`,
      token,
      user,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});


// Endpoint untuk verifikasi token (Tetap sama)
router.get('/verify', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);

        if (users.length > 0) {
            const user = users[0];
            delete user.password;
            
            if (user.role === 'pegawai') {
               user.riwayat = await fetchAllRiwayat(user.id);
            }

            res.json({ user });
        } else {
            res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
    }
});


// Endpoint untuk mengubah password (Tetap sama)
router.post('/change-password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        const user = users[0];

        if (user.password !== oldPassword) {
            return res.status(400).json({ message: 'Password lama salah' });
        }

        await pool.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);

        res.json({ message: 'Password berhasil diubah' });

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});


export default router;