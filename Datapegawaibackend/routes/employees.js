import { Router } from 'express';
import { allEmployees } from '../data.js';

const router = Router();

// GET: Mengambil semua data pegawai (READ)
router.get('/', (req, res) => {
  res.json(allEmployees);
});

// GET: Mengambil data satu pegawai berdasarkan ID (READ)
router.get('/:id', (req, res) => {
  const employee = allEmployees.find(emp => emp.id === parseInt(req.params.id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Pegawai tidak ditemukan' });
  }
});

// POST: Menambahkan pegawai baru (CREATE)
router.post('/', (req, res) => {
  const { name, nip, jabatan, golongan } = req.body;
  
  if (!name || !nip || !jabatan || !golongan) {
    return res.status(400).json({ message: 'Nama, NIP, Jabatan, dan Golongan harus diisi' });
  }

  const newEmployee = {
    id: Date.now(),
    name,
    nip: `010229XXX / ${nip}`,
    jabatan,
    golongan,
    password: 'password123',
    profilePictureUrl: '/assets/profile-pic.jpg',
    riwayat: {},
    ttl: '', agama: '', alamat: '', pendidikan: '', instansi: '',
    nomorHp: '', email: '', noKtp: '', noNpwp: '', noKarpeg: '', noKaris: '',
    noAskes: '', noTaspen: '', noRekening: '',
  };

  allEmployees.unshift(newEmployee);
  res.status(201).json(newEmployee);
});

// PUT: Memperbarui data pegawai berdasarkan ID (UPDATE)
router.put('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = allEmployees.findIndex(emp => emp.id === employeeId);

  if (employeeIndex !== -1) {
    const updatedEmployee = { ...allEmployees[employeeIndex], ...req.body };
    allEmployees[employeeIndex] = updatedEmployee;
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: 'Pegawai tidak ditemukan' });
  }
});

// DELETE: Menghapus pegawai berdasarkan ID (DELETE)
router.delete('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const initialLength = allEmployees.length;
  const newEmployeeList = allEmployees.filter(emp => emp.id !== employeeId);

  if (newEmployeeList.length < initialLength) {
    allEmployees.length = 0;
    allEmployees.push(...newEmployeeList);
    res.status(200).json({ message: 'Pegawai berhasil dihapus' });
  } else {
    res.status(404).json({ message: 'Pegawai tidak ditemukan' });
  }
});

export default router;