// Datapegawaibackend/routes/employees.js

import { Router } from 'express';
import { put, del } from '@vercel/blob'; // Impor fungsi dari Vercel Blob
import bcrypt from 'bcrypt';
import pool, { fetchAllRiwayat } from '../db.js';

const router = Router();
const SALT_ROUNDS = 10;

// Fungsi untuk menghapus file lama dari Vercel Blob
const deleteOldBlob = async (fileUrl) => {
  if (!fileUrl) return;
  try {
    await del(fileUrl);
    console.log(`Blob lama berhasil dihapus: ${fileUrl}`);
  } catch (error) {
    console.error(`Gagal menghapus blob lama: ${fileUrl}`, error);
  }
};


// === ROUTES PEGAWAI (USERS) ===

// ... (GET semua pegawai, GET satu pegawai, POST pegawai baru tidak berubah) ...
router.get('/', async (req, res) => {
    try {
        const [employees] = await pool.query("SELECT * FROM users WHERE role = 'pegawai' ORDER BY id DESC");
        employees.forEach(emp => delete emp.password);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
        if (users.length > 0 && users[0].profilePictureUrl) {
            await deleteOldBlob(users[0].profilePictureUrl);
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


// POST: Upload foto profil (MENGGUNAKAN VERCEL BLOB)
router.post('/:id/upload-profile-picture', async (req, res) => {
    const employeeId = req.params.id;
    const filename = req.headers['x-vercel-filename'] || `profile-pic-${employeeId}.jpg`;

    try {
        // 1. Upload file ke Vercel Blob
        const blob = await put(filename, req.body, {
            access: 'public',
        });

        // 2. Hapus blob lama jika ada
        const [users] = await pool.query('SELECT profilePictureUrl FROM users WHERE id = ?', [employeeId]);
        if (users.length > 0 && users[0].profilePictureUrl) {
            await deleteOldBlob(users[0].profilePictureUrl);
        }

        // 3. Update database dengan URL blob yang baru
        await pool.query('UPDATE users SET profilePictureUrl = ? WHERE id = ?', [blob.url, employeeId]);

        // 4. Ambil data user terbaru dan kirim sebagai respons
        const [updatedUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [employeeId]);
        const user = updatedUsers[0];
        delete user.password;
        user.riwayat = await fetchAllRiwayat(user.id);

        res.json({ message: 'Foto profil berhasil diperbarui', user });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: `Gagal mengunggah foto: ${error.message}` });
    }
});


// === GENERIC ROUTES UNTUK SEMUA RIWAYAT (DENGAN VERCEL BLOB) ===
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
    sipstr: 'riwayat_sip_str',
};

Object.keys(riwayatTables).forEach(key => {
    const tableName = riwayatTables[key];

    // POST: Tambah riwayat baru (dengan upload jika ada file)
    router.post(`/:id/${key}`, async (req, res) => {
        const filename = req.headers['x-vercel-filename'];
        const data = { ...req.body, user_id: req.params.id };

        try {
            if (filename) {
                const blob = await put(filename, req.body, { access: 'public' });
                data.berkasUrl = blob.url;
            }
            delete data.berkas; // Hapus field berkas dari data yang akan disimpan

            const [result] = await pool.query(`INSERT INTO ${tableName} SET ?`, data);
            res.status(201).json({ id: result.insertId, ...data });
        } catch (error) {
            res.status(500).json({ message: `Gagal menyimpan data: ${error.message}` });
        }
    });

    // PUT: Update riwayat (dengan upload jika ada file baru)
    router.put(`/:id/${key}/:itemId`, async (req, res) => {
        const filename = req.headers['x-vercel-filename'];
        const data = { ...req.body };

        try {
            if (filename) {
                const blob = await put(filename, req.body, { access: 'public' });
                data.berkasUrl = blob.url;
                
                // Hapus blob lama
                const [oldData] = await pool.query(`SELECT berkasUrl FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
                if (oldData.length > 0 && oldData[0].berkasUrl) {
                    await deleteOldBlob(oldData[0].berkasUrl);
                }
            }
            delete data.berkas;

            const [result] = await pool.query(`UPDATE ${tableName} SET ? WHERE id = ? AND user_id = ?`, [data, req.params.itemId, req.params.id]);
            if (result.affectedRows > 0) {
                 const [updated] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
                 res.json(updated[0]);
            } else {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({ message: `Gagal memperbarui data: ${error.message}` });
        }
    });

    // DELETE: Hapus riwayat (dan hapus file dari blob)
    router.delete(`/:id/${key}/:itemId`, async (req, res) => {
        try {
            const [oldData] = await pool.query(`SELECT berkasUrl FROM ${tableName} WHERE id = ?`, [req.params.itemId]);
            if (oldData.length > 0 && oldData[0].berkasUrl) {
                await deleteOldBlob(oldData[0].berkasUrl);
            }

            const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ? AND user_id = ?`, [req.params.itemId, req.params.id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Data berhasil dihapus' });
            } else {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({ message: `Gagal menghapus data: ${error.message}` });
        }
    });
});

export default router;