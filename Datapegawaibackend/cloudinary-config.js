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
    // Tentukan flag berdasarkan tipe file
    const flags = file.mimetype === 'application/pdf' ? ['attachment'] : [];

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.split('.').slice(0, -1).join('.');

    return {
      folder: 'data-kepegawaian',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      resource_type: 'auto',
      public_id: `${originalName}-${uniqueSuffix}`,
      flags: flags, // Terapkan flag di sini
    };
  },
};
const storage = new CloudinaryStorage(storageOptions);

export { cloudinary, storage };