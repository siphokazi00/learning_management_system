const UserModel = require('./models/userModel');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
const protectedRoutes = require('./routes/protectedRoutes'); // Import protected routes
require('dotenv').config();

const app = express(); // Initialize the Express app

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(cors()); // enable CORS

// Routes
app.use('/api/auth', authRoutes);

// start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// log environment and database connection
const pool = require('./config/db');
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database test failed:', err);
  else console.log('Database test succeeded:', res.rows[0]);
});

require('dotenv').config();
console.log('Database Host:', process.env.DB_HOST);

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes
console.log('ProtectedRoutes loaded!');
app.use('/api/auth', authRoutes); // Register authentication routes
app.use('/api/protected', protectedRoutes); // Register protected routes
console.log('Protected routes registered at /api/protected');

// Call the test functions here
// testUser();
// testFindUser();