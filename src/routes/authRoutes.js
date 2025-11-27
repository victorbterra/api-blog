import express from 'express';
import AuthController from '../controllers/authController.js';



const router = express.Router();


router.post('/auth/register', AuthController.registerUser); // rota para registrar um novo usuário
router.post('/auth/login', AuthController.loginUser); // rota para login de usuário

export default router; // exporta o router para ser usado em outro arquivo