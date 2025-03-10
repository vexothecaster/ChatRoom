const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();

// Create HTTP server and hook up with Express app
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Serve static files (like your HTML, CSS, and JS) from the "public" folder
app.use(express.static('public'));

// Set up a simple route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listen for new connections and broadcast chat messages
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle receiving a message and broadcasting it
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('chat message', msg); // Broadcast message to everyone
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
