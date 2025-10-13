import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = 3001;

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Middleware untuk menyajikan file statis dari folder 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});