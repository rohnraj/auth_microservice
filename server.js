import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './router/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
 
app.use('/', authRoutes);
app.use('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});