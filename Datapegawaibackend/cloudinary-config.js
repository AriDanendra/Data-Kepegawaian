import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storageOptions = {
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Tentukan flag 'attachment' untuk semua tipe file agar langsung diunduh
    const flags = ['attachment']; // <--- Perubahan di sini

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.split('.').slice(0, -1).join('.');

    // Tentukan folder berdasarkan tipe file (opsional, jika Anda ingin memisahkan)
    let folder = 'data-kepegawaian/berkas-lain';
    if (file.mimetype.startsWith('image/')) {
        folder = 'data-kepegawaian/gambar';
    } else if (file.mimetype === 'application/pdf') {
        folder = 'data-kepegawaian/pdf';
    }

    return {
      folder: folder, // Folder dinamis atau statis
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Format yang diizinkan
      resource_type: 'auto', // Cloudinary akan mendeteksi tipe resource
      public_id: `${originalName}-${uniqueSuffix}`, // Nama file unik
      flags: flags, // Terapkan flag 'attachment'
    };
  },
};
const storage = new CloudinaryStorage(storageOptions);

export { cloudinary, storage };