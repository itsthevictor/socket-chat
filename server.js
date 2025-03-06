import morgan from 'morgan';
import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connectDb.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { app, server, io } from './config/socket.js';
dotenv.config();

import cloudinary from 'cloudinary';

// routers

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandler.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/messages', authenticateUser, messageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// error middleware
app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});
app.use(errorHandlerMiddleware);

// PORT
const PORT = process.env.PORT || 8080;

// Spin-up function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

// spin-up server
start();
