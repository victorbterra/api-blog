import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração do Armazenamento (Multer + Cloudinary)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog-terratech', // Nome da pasta no Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

export default storage;