require('dotenv').config(); // Load environment variables from a .env
const UserModel = require('./models/userModel');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
const protectedRoutes = require('./routes/protectedRoutes'); // Import protected routes

const app = express(); // Initialize the Express app

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/protected', protectedRoutes); // Protected routes

// Middleware to serve static files from the 'Frontend' folder
app.use(express.static(path.join(__dirname, 'Frontend')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Log environment and database connection
const pool = require('./config/db');

pool.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error querying users table:', err);
    } else {
        console.log('Users table data:', res.rows);
    }
});

console.log('Database Host:', process.env.DB_HOST);
console.log('Protected routes registered at /api/protected');