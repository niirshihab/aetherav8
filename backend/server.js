require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const hrRoutes = require('./src/routes/hrRoutes');
const notificationsRoutes = require('./src/routes/notificationsRoutes');
// Initialize Express App
const app = express();
app.use(express.json());

// CORS Configuration
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: frontendOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/leave-requests', leaveRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/notifications', notificationsRoutes);

// Test Email Route
app.get('/test-email', async (req, res) => {
  try {
    await sendMfaCodeEmail('shihab@brodmann10.com', '123456'); // Ensure `sendMfaCodeEmail` is imported
    res.send('Test email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send test email: ' + error.message);
  }
});

// Initialize HTTP and Socket.io Servers
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendOrigin,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendNotification', (data) => {
    io.emit('receiveNotification', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5006;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = io;