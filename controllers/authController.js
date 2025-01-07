console.log('Login endpoint hit');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
require('dotenv').config();

// Add this modification to handle missing JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const AuthController = {
  async register(req, res) {
    console.log('Register endpoint hit');
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) return res.status(400).json({ error: 'User already exists' });

      const user = await UserModel.createUser({ name, email, password, role });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.stack : err.message,
      });
    }
  },

  async login(req, res) {
    console.log('Login endpoint hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '1h' }
      );
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.stack : err.message,
      });
    }
  },

  // Add the logout function
  logout(req, res) {
    res.json({
      message: 'You have been logged out successfully. Please clear your token on the client side.',
    });
  },
};

module.exports = AuthController;