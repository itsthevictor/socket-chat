import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userId = socket.handshake.query.userId;
  console.log('handshake query', userId);

  if (userId) userSocketMap[userId] = socket.id;

  // send event to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// keep track of online users {userId:socketId}
export const userSocketMap = {};
