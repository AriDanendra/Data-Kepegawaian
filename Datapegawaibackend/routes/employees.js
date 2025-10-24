import { Router } from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import pool, { fetchAllRiwayat } from '../db.js';
import { cloudinary, storage as cloudinaryStorage } from '../cloudinary-config.js';

const router = Router();
const SALT_ROUNDS = 10;

// --- Konfigurasi Umum ---
// Gunakan storage engine dari Cloudinary yang sudah kita buat
const upload = multer({ storage: cloudinaryStorage });

// Middleware
const handleUpload = upload.single('berkas');
const uploadProfilePic = upload.single('profilePicture');

// Helper function untuk menghapus dari Cloudinary berdasarkan URL
const deleteFromCloudinary = async (fileUrl) => {
    if (!fileUrl || !fileUrl.includes('cloudinary.com')) {
        console.log("URL tidak valid atau bukan file Cloudinary, penghapusan dilewati.");
        return;
    }
    try {
        // Ekstrak public_id dari URL
        const publicIdWithFolder = fileUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicIdWithFolder);
        console.log(`File berhasil dihapus dari Cloudinary: ${publicIdWithFolder}`);
    } catch (error) {
        console.error(`Gagal menghapus file dari Cloudinary: ${fileUrl}`, error);
    }
};


// === ROUTES PEGAWAI (USERS) ===

// GET: Semua pegawai
router.get('/', async (req, res) => {
    try {
        const [employees] = await pool.query("SELECT * FROM users WHERE role = 'pegawai' ORDER BY id DESC");
        employees.forEach(emp => delete emp.password);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Satu pegawai by ID
router.get('/:id', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (users.length > 0) {
            const user = users[0];
            delete user.password;
            user.riwayat = await fetchAllRiwayat(user.id);
            res.json(user);
        } else {
            res.status(404).json({ message: 'Pegawai tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Tambah pegawai baru
router.post('/', async (req, res) => {
    const { name, nip, jabatan, golongan } = req.body;
    try {
        const hashedPassword = await bcrypt.hash('password123', SALT_ROUNDS);
        const [result] = await pool.query(
            'INSERT INTO users (name, nip, jabatan, golongan, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [name, nip, jabatan, golongan, hashedPassword, 'pegawai']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update data pegawai
router.put('/:id', async (req, res) => {
    try {
        const updateData = { ...req.body };
        delete updateData.riwayat;
        delete updateData.password;

        const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [updateData, req.params.id]);
        if (result.affectedRows > 0) {
            const [updatedUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
            const user = updatedUsers[0];
            delete user.password;
            res.json(user);
        } else {
            res.status(404).json({ message: 'Pegawai tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Hapus pegawai
router.delete('/:id', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT profilePictureUrl FROM users WHERE id = ?', [req.params.id]);
        if (users.length > 0) {
            await deleteFromCloudinary(users[0].profilePictureUrl);
        }

        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pegawai berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Pegawai tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Upload foto profil
router.post('/:id/upload-profile-picture', uploadProfilePic, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
  }

  const employeeId = req.params.id;

  try {
    // 1. Hapus foto lama dari Cloudinary
    const [users] = await pool.query('SELECT profilePictureUrl FROM users WHERE id = ?', [employeeId]);
    if (users.length > 0 && users[0].profilePictureUrl) {
      await deleteFromCloudinary(users[0].profilePictureUrl);
    }
    
    // 2. Update URL di database dengan URL dari Cloudinary
    // req.file.path berisi URL aman dari Cloudinary
    await pool.query('UPDATE users SET profilePictureUrl = ? WHERE id = ?', [req.file.path, employeeId]);
    
    // 3. Ambil data user terbaru dan kirim sebagai response
    const [updatedUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [employeeId]);
    const user = updatedUsers[0];
    delete user.password;
    user.riwayat = await fetchAllRiwayat(user.id);

    res.json({ message: 'Foto profil berhasil diperbarui', user });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
});


// === GENERIC ROUTES UNTUK SEMUA RIWAYAT ===
const riwayatTables = {
    jabatan: 'riwayat_jabatan',
    pendidikan: 'riwayat_pendidikan',
    kgb: 'riwayat_kgb',
    cuti: 'riwayat_cuti',
    status: 'riwayat_status_kepegawaian',
    keluarga: 'riwayat_keluarga',
    diklat: 'riwayat_diklat',
    penghargaan: 'riwayat_penghargaan',
    organisasi: 'riwayat_organisasi',
    skp: 'riwayat_skp',
    hukuman: 'riwayat_hukuman',
    sipstr: 'riwayat_sip_str',
};

Object.keys(riwayatTables).forEach(key => {
    const tableName = riwayatTables[key];

    // POST: Tambah riwayat baru
    router.post(`/:id/${key}`, handleUpload, async (req, res) => {
        const data = { ...req.body, user_id: req.params.id };
        if (req.file) {
            data.berkasUrl = req.file.path; // Langsung ambil URL dari Cloudinary
        }
        try {
            const [result] = await pool.query(`INSERT INTO ${tableName} SET ?`, data);
            res.status(201).json({ id: result.insertId, ...data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // PUT: Update riwayat
    router.put(`/:id/${key}/:itemId`, handleUpload, async (req, res) => {
        const data = { ...req.body };
        try {
            if (req.file) {
                const [oldData] = await pool.query(`SELECT berkasUrl FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
                if (oldData.length > 0 && oldData[0].berkasUrl) {
                    await deleteFromCloudinary(oldData[0].berkasUrl);
                }
                data.berkasUrl = req.file.path;
            }

            const [result] = await pool.query(`UPDATE ${tableName} SET ? WHERE id = ? AND user_id = ?`, [data, req.params.itemId, req.params.id]);
            if (result.affectedRows > 0) {
                 const [updated] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
                 res.json(updated[0]);
            } else {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // DELETE: Hapus riwayat
    router.delete(`/:id/${key}/:itemId`, async (req, res) => {
        try {
            const [oldData] = await pool.query(`SELECT berkasUrl FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
            if (oldData.length > 0 && oldData[0].berkasUrl) {
                await deleteFromCloudinary(oldData[0].berkasUrl);
            }

            const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ? AND user_id = ?`, [req.params.itemId, req.params.id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Data berhasil dihapus' });
            } else {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
});

export default router;