const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => res.send('✅ Prescripto Backend is Running!'));

app.get('/api/test', (req, res) => {
  res.json({ msg: "Backend connected successfully 🚀" });
});

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();