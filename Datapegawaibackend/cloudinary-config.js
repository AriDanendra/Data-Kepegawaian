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
  params: {
    folder: 'data-kepegawaian', // Nama folder di Cloudinary untuk menyimpan file
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    // public_id unik untuk setiap file
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      // Mengambil nama asli file tanpa ekstensi
      const originalName = file.originalname.split('.').slice(0, -1).join('.');
      return `${originalName}-${uniqueSuffix}`;
    },
  },
};

const storage = new CloudinaryStorage(storageOptions);

export { cloudinary, storage };