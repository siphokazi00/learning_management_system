console.log('Auth routes loaded successfully');
const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController'); // Import the controller
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Logout endpoint
router.post('/logout', authMiddleware, AuthController.logout);

// Register endpoint
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  AuthController.register
);

// Login endpoint
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  AuthController.login
);

module.exports = router;