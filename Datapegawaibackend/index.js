import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../public/uploads'); // Sesuaikan path untuk Vercel
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, '../public')));

// Gunakan prefix /api untuk semua rute
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Export app untuk Vercel
export default app;