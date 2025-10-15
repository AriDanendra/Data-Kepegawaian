import { Router } from 'express';
import { allEmployees } from '../data.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = Router();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Konfigurasi Multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Ganti spasi atau karakter tidak valid pada nama file asli
    const originalname = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + originalname);
  }
});

// Middleware upload untuk satu berkas dengan nama field 'berkas'
const upload = multer({ storage: storage });
const uploadProfilePic = multer({ storage: storage }).single('profilePicture');


// Helper function untuk menangani upload
const handleUpload = (req, res, next) => {
  // Menggunakan 'berkas' sebagai nama field default
  upload.single('berkas')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Multer error: " + err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown upload error: " + err.message });
    }
    next();
  });
};


// Endpoint untuk upload foto profil
router.post('/:id/upload-profile-picture', uploadProfilePic, (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = allEmployees.findIndex(emp => emp.id === employeeId);

  if (employeeIndex !== -1) {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
    }
    
    const fileUrl = `/public/uploads/${req.file.filename}`;
    allEmployees[employeeIndex].profilePictureUrl = fileUrl;

    res.json({
      message: 'Foto profil berhasil diperbarui',
      filePath: fileUrl,
      user: allEmployees[employeeIndex]
    });
  } else {
    res.status(404).json({ message: 'Pegawai tidak ditemukan' });
  }
});


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
    nip: `${nip}`,
    jabatan,
    golongan,
    password: 'password123',
    profilePictureUrl: '/assets/profile-pic.jpg',
    riwayat: {
        jabatan: [],
        pendidikan: [],
        kgb: [],
        cuti: [],
        statusKepegawaian: [],
        keluarga: [],
        diklat: [],
        penghargaan: [],
        organisasi: [],
        skp: [],
        skpPermenpan: [],
        hukuman: [],
    },
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

// Generic function to add new history data with file upload
const addHistory = (category) => (req, res) => {
    const employeeIndex = allEmployees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (employeeIndex !== -1) {
        const newEntry = {
            id: Date.now(),
            ...req.body,
            berkasUrl: req.file ? `/public/uploads/${req.file.filename}` : null
        };
        if (!allEmployees[employeeIndex].riwayat[category]) {
            allEmployees[employeeIndex].riwayat[category] = [];
        }
        allEmployees[employeeIndex].riwayat[category].push(newEntry);
        res.status(201).json(newEntry);
    } else {
        res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }
};

// Generic function to update history data with file upload
const updateHistory = (category) => (req, res) => {
    const employeeIndex = allEmployees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (employeeIndex !== -1) {
        // FIX: Menggunakan perbandingan '==' yang lebih longgar untuk mencocokkan ID (string vs number)
        const entryIndex = allEmployees[employeeIndex].riwayat[category]?.findIndex(item => item.id == req.params.itemId);
        
        if (entryIndex !== -1) {
            const existingEntry = allEmployees[employeeIndex].riwayat[category][entryIndex];
            const updatedEntry = {
                ...existingEntry,
                ...req.body
            };

            if (req.file) {
                updatedEntry.berkasUrl = `/public/uploads/${req.file.filename}`;
            } else {
                updatedEntry.berkasUrl = existingEntry.berkasUrl;
            }

            allEmployees[employeeIndex].riwayat[category][entryIndex] = updatedEntry;
            res.json(updatedEntry);
        } else {
            res.status(404).json({ message: 'Data tidak ditemukan' });
        }
    } else {
        res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }
};


// Generic function to delete history data
const deleteHistory = (category) => (req, res) => {
    const employeeIndex = allEmployees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (employeeIndex !== -1) {
        const initialLength = allEmployees[employeeIndex].riwayat[category]?.length || 0;
        if (allEmployees[employeeIndex].riwayat[category]) {
            // FIX: Menggunakan perbandingan '!=' yang lebih longgar
            allEmployees[employeeIndex].riwayat[category] = allEmployees[employeeIndex].riwayat[category].filter(
                item => item.id != req.params.itemId
            );
        }
        if (allEmployees[employeeIndex].riwayat[category]?.length < initialLength) {
            res.status(200).json({ message: 'Data berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Data tidak ditemukan' });
        }
    } else {
        res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }
};

// ===================================================
// ==  REFACTORED ENDPOINTS FOR ALL HISTORY TYPES   ==
// ===================================================
const categories = {
    'jabatan': 'jabatan',
    'pendidikan': 'pendidikan',
    'kgb': 'kgb',
    'cuti': 'cuti',
    'status': 'statusKepegawaian',
    'keluarga': 'keluarga',
    'diklat': 'diklat',
    'penghargaan': 'penghargaan',
    'organisasi': 'organisasi',
    'skp': 'skp',
    'skp-permenpan': 'skpPermenpan',
    'hukuman': 'hukuman',
};

for (const [routeName, dataKey] of Object.entries(categories)) {
    router.post(`/:id/${routeName}`, handleUpload, addHistory(dataKey));
    router.put(`/:id/${routeName}/:itemId`, handleUpload, updateHistory(dataKey));
    router.delete(`/:id/${routeName}/:itemId`, deleteHistory(dataKey));
}

export default router;