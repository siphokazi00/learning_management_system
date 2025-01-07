const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Import the database pool

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error querying users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Insert a new user
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role || 'student'] // Default role is 'student'
    );

    // Return the newly created user (without the password for security)
    const { password: _, ...userWithoutPassword } = result.rows[0]; // Exclude the password from the response
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error('Error creating user:', err.message);

    // Handle duplicate email error
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Database error' });
  }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users'); // Exclude passwords
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving users:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Retrieve a user by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE email = $1', [email]); // Exclude passwords

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error retrieving user by email:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};