const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // For Express routes (optional)

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Your Vite/React frontend
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Send initial time
  socket.emit('timeUpdate', new Date().toLocaleString());

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Emit updated time to all clients every second
const interval = setInterval(() => {
  io.emit('timeUpdate', new Date().toLocaleString());
}, 1000);

// Clean up interval on server shutdown
server.on('close', () => {
  clearInterval(interval);
});

server.listen(3000, () => {
  console.log(`Server is running on: http://localhost:3000`);
});
