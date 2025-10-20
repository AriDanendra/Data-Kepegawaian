import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import path from 'path';
import { fileURLToPath } from 'url';
// HAPUS import fs

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HAPUS SEMUA BLOK KODE INI
// const uploadDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, 'public/uploads');
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

app.use(cors());
app.use(express.json());

// Anda masih bisa menyajikan file statis dari direktori 'public' jika dibutuhkan
// untuk aset seperti gambar default, dll.
app.use('/public', express.static(path.join(__dirname, 'public')));

// HAPUS BLOK KODE INI
// if (process.env.VERCEL) {
//   app.use('/public/uploads', express.static(uploadDir));
// }

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});