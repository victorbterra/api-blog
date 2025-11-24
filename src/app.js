import express from 'express';
import cors from 'cors';

const app = express(); // middleware para aceitar JSON nas requisições

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('API Blog rodando com sucesso!');
}); // rota para testar se a API está funcionando


export default app;