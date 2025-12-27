const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/equipment', require('./routes/equipmentRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// Simple user route placeholder if we had a controller, but for now just to populate data logic
// We might add a seeder later.

app.get('/', (req, res) => {
  res.send('GearGuard API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
