import postsRoutes from './routes/postRoutes.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express(); // middleware para aceitar JSON nas requisições

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(postsRoutes); // usa as rotas de posts

export default app;