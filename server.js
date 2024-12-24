const UserModel = require('./models/userModel');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pool = require('./config/db');
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database test failed:', err);
  else console.log('Database test succeeded:', res.rows[0]);
});

require('dotenv').config();
console.log('Database Host:', process.env.DB_HOST);

// Test Function to create a user
const testUser = async () => {
  try {
    const user = await UserModel.createUser({
      name: 'Somia Precious',
      email: 'somiaprecious@gmail.com',
      password: '123',
      role: 'student',
    });
    console.log('User Created:', user);
  } catch (err) {
    console.error('Error creating user:', err.message);
  }
};

// Test Function to find a user by email
const testFindUser = async () => {
  try {
    const user = await UserModel.findByEmail('somiaprecious@gmail.com');
    console.log('User Found:', user);
  } catch (err) {
    console.error('Error finding user:', err.message);
  }
};

// Call the test functions here
testUser();
testFindUser();