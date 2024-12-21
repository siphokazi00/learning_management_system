const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], AuthController.register);

router.post('/login', AuthController.login);

module.exports = router;