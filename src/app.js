import postsRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express(); // middleware para aceitar JSON nas requisições
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api-docs', serveSwagger, setupSwagger);

app.use(postsRoutes); // usa as rotas de posts
app.use(authRoutes); // usa as rotas de autenticação
app.use('/upload', uploadRoutes); // usa as rotas de upload

export default app;