import { Router } from 'express';
import { allEmployees, adminUser } from '../data.js';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = 'your-secret-key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password diperlukan' });
  }

  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ id: adminUser.id, role: adminUser.role }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      message: 'Login sebagai admin berhasil',
      token,
      user: adminUser
    });
  }

  const employee = allEmployees.find(emp => emp.nip.includes(username));

  if (employee && employee.password === password) {
    const userPayload = { ...employee, role: 'pegawai' };
    const token = jwt.sign({ id: employee.id, role: 'pegawai' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      message: 'Login sebagai pegawai berhasil',
      token,
      user: userPayload
    });
  }

  return res.status(401).json({ message: 'Username atau password salah' });
});

// Endpoint untuk mengubah password
router.post('/change-password', (req, res) => {
    const { userId, oldPassword, newPassword, role } = req.body;
  
    let userToUpdate;
  
    if (role === 'admin') {
      userToUpdate = adminUser;
    } else {
      userToUpdate = allEmployees.find(emp => emp.id === userId);
    }
  
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  
    if (userToUpdate.password !== oldPassword) {
      return res.status(400).json({ message: 'Password lama salah' });
    }
  
    userToUpdate.password = newPassword;
  
    res.json({ message: 'Password berhasil diubah' });
  });

// Endpoint baru untuk verifikasi token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user;

    if (decoded.role === 'admin') {
      user = adminUser;
    } else {
      user = allEmployees.find(emp => emp.id === decoded.id);
    }

    if (user) {
      const userPayload = { ...user, role: decoded.role };
      res.json({ user: userPayload });
    } else {
      res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
});


export default router;