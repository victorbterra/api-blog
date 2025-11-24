import express from 'express';
import postController from '../controllers/postController.js';


const router = express.Router();

router.post('/posts', postController.createPost); // rota para criar um novo post

export default router; // exporta o router para ser usado em outro arquivo