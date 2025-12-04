import express from 'express';
import cloudinaryConfig from '../config/cloudinary.js';
import multer from 'multer';


const router = express.Router();

const upload = multer({ storage: cloudinaryConfig });


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