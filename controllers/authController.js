const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const AuthController = {
  async register(req, res) {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) return res.status(400).json({ error: 'User already exists' });

      const user = await UserModel.createUser({ name, email, password, role });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AuthController;