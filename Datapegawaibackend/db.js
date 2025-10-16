import mysql from 'mysql2/promise';

// Buat koneksi pool ke database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // default user XAMPP
  password: '', // default password XAMPP
  database: 'db_kepegawaian',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fungsi untuk mengambil semua riwayat data untuk seorang pegawai
export const fetchAllRiwayat = async (userId) => {
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
        skpPermenpan: 'riwayat_skp_permenpan',
        hukuman: 'riwayat_hukuman',
    };

    for (const key in tables) {
        const [rows] = await pool.query(`SELECT * FROM ${tables[key]} WHERE user_id = ? ORDER BY id DESC`, [userId]);
        riwayat[key] = rows;
    }
    return riwayat;
};

export default pool;