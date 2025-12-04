import app from './app.js';
import connectDB from './config/dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
  });
}); // 

