import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();
const router = express.Router();

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

const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }
    res.json({
    success: true,
    time: Date.now(),
    data: {
      baseurl: "",
      messages: [],
      files: [req.file.path] // Aqui vai a URL da imagem no Cloudinary
    }
  });
});

export default router;