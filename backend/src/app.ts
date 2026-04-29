import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { errors as celebrateErrorHandler } from 'celebrate';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const dbAddress = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

async function start() {
  await mongoose.connect(dbAddress);
  console.log('MongoDB connected');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(requestLogger);

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/product', productRoutes);
  app.use('/order', orderRoutes);

  app.get('/', (_req, res) => {
    res.send('Web-ларёк API работает');
  });

  app.use(errorLogger);
  app.use(celebrateErrorHandler());
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Ошибка запуска:', err);
  process.exit(1);
});