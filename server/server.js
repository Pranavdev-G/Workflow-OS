const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const socketHandler = require('./sockets/socketHandler');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to Database
connectDB();

const app = require('./app');
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Socket.io setup
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});