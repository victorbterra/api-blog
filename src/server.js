import app from './app.js';
import connectDB from './config/dbConnect.js';



const PORT = process.env.PORT || 3000;


try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  await connectDB();
} catch (error) { 
  console.error('Erro ao conectar ao banco de dados:', error);
  process.exit(1);
}