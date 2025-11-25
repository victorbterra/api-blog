import express from 'express';
import postController from '../controllers/postController.js';


const router = express.Router();

router.post('/posts', postController.createPost); // rota para criar um novo post
router.get('/posts', postController.getPosts); // rota para obter todos os posts
router.get('/posts/slug/:slug', postController.getPostBySlug); // rota para obter um post por slug
router.get('/posts/:id', postController.getPostById); // rota para obter um post por ID
router.put('/posts/:id', postController.updatePost); // rota para atualizar um post por ID
router.delete('/posts/:id', postController.deletePost); // rota para deletar um post por ID

export default router; // exporta o router para ser usado em outro arquivo