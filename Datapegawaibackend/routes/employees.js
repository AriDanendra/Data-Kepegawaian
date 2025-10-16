import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pool, { fetchAllRiwayat } from '../db.js';

const router = Router();

// Konfigurasi Multer (sama seperti sebelumnya)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalname = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${originalname}`);
  }
});
const upload = multer({ storage: storage });

// Middleware
const handleUpload = upload.single('berkas');
const uploadProfilePic = upload.single('profilePicture');

// === ROUTES PEGAWAI (USERS) ===

// GET: Semua pegawai
router.get('/', async (req, res) => {
    try {
        const [employees] = await pool.query("SELECT * FROM users WHERE role = 'pegawai' ORDER BY id DESC");
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
        const [result] = await pool.query(
            'INSERT INTO users (name, nip, jabatan, golongan, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [name, nip, jabatan, golongan, 'password123', 'pegawai']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update data pegawai (FIXED)
router.put('/:id', async (req, res) => {
    try {
        // Ambil data dari body dan hapus properti 'riwayat' jika ada
        const updateData = { ...req.body };
        delete updateData.riwayat;

        const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [updateData, req.params.id]);
        if (result.affectedRows > 0) {
            const [updatedUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
            const user = updatedUsers[0];
            delete user.password; // Jangan kirim password ke frontend
            res.json(user);
        } else {
            res.status(404).json({ message: 'Pegawai tidak ditemukan' });
        }
    } catch (error) {
        console.error("Update error:", error); // Tambahkan log error di server
        res.status(500).json({ message: error.message });
    }
});


// DELETE: Hapus pegawai
router.delete('/:id', async (req, res) => {
    try {
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
    const fileUrl = `/public/uploads/${req.file.filename}`;
    try {
        await pool.query('UPDATE users SET profilePictureUrl = ? WHERE id = ?', [fileUrl, req.params.id]);
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        const user = users[0];
        delete user.password;
        user.riwayat = await fetchAllRiwayat(user.id);
        res.json({ message: 'Foto profil berhasil diperbarui', user });
    } catch (error) {
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
    'skp-permenpan': 'riwayat_skp_permenpan',
    hukuman: 'riwayat_hukuman',
};

Object.keys(riwayatTables).forEach(key => {
    const tableName = riwayatTables[key];

    // POST
    router.post(`/:id/${key}`, handleUpload, async (req, res) => {
        const data = { ...req.body, user_id: req.params.id };
        if (req.file) data.berkasUrl = `/public/uploads/${req.file.filename}`;

        try {
            const [result] = await pool.query(`INSERT INTO ${tableName} SET ?`, data);
            res.status(201).json({ id: result.insertId, ...data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // PUT
    router.put(`/:id/${key}/:itemId`, handleUpload, async (req, res) => {
        const data = { ...req.body };
        if (req.file) data.berkasUrl = `/public/uploads/${req.file.filename}`;

        try {
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

    // DELETE
    router.delete(`/:id/${key}/:itemId`, async (req, res) => {
        try {
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