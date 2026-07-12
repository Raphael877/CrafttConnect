const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

// Register Mongoose models first
require('./models/User');
require('./models/Message');
require('./models/Review');

const { loadBackup } = require('./utils/persistence');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/artisans', require('./routes/artisanRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/craftconnect';
const seedDB = require('./seed');

const connectDB = async () => {
  const setupDatabase = async () => {
    const fs = require('fs');
    const path = require('path');
    const usersBackupPath = path.join(__dirname, 'data/users.json');
    const User = mongoose.model('User');
    const userCount = await User.countDocuments({});
    
    if (userCount === 0) {
      if (fs.existsSync(usersBackupPath)) {
        await loadBackup();
      } else {
        await seedDB();
      }
    }
  };

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');
    await setupDatabase();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes configuration will come here
app.get('/', (req, res) => {
  res.send('CraftConnect API is running...');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    // data should contain: room, sender, text, timestamp
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
