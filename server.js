const UserModel = require('./models/userModel');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
const protectedRoutes = require('./routes/protectedRoutes'); // Import protected routes
require('dotenv').config();

const app = express(); // Initialize the Express app

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(cors()); // enable CORS

app.use(bodyParser.json()); // Parse JSON request bodies
app.use('/api', userRoutes); // Add user routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes); // Register protected routes

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Log environment and database connection
const pool = require('./config/db');
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database test failed:', err);
  else console.log('Database test succeeded:', res.rows[0]);
});

console.log('Database Host:', process.env.DB_HOST);
console.log('Protected routes registered at /api/protected');