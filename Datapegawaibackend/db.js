// Datapegawaibackend/db.js

import mysql from 'mysql2/promise';
// Impor modul 'fs', 'path', dan 'url' untuk membaca file
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Tambahkan baris ini untuk mendapatkan __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buat koneksi pool ke database menggunakan environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Opsi SSL ini wajib untuk koneksi ke Aiven
  ssl: {
    // Tambahkan baris ini untuk membaca file sertifikat CA
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    rejectUnauthorized: true,
  },
});

// Fungsi untuk mengambil semua riwayat data untuk seorang pegawai (tidak ada perubahan)
export const fetchAllRiwayat = async (userId) => {
    // ... sisa fungsi ini tidak perlu diubah ...
    const riwayat = {};
    const tables = {
        jabatan: 'riwayat_jabatan',
        pendidikan: 'riwayat_pendidikan',
        kgb: 'riwayat_kgb',
        cuti: 'riwayat_cuti',
        statusKepegawaian: 'riwayat_status_kepegawaian',
        keluarga: 'riwayat_keluarga',
        diklat: 'riwayat_diklat',
        penghargaan: 'riwayat_penghargaan',
        organisasi: 'riwayat_organisasi',
        skp: 'riwayat_skp',
        hukuman: 'riwayat_hukuman',
        sipstr: 'riwayat_sip_str',
    };

    for (const key in tables) {
        const [rows] = await pool.query(`SELECT * FROM ${tables[key]} WHERE user_id = ? ORDER BY id DESC`, [userId]);
        riwayat[key] = rows;
    }
    return riwayat;
};

export default pool;