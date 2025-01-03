const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser); // Create a new user
router.get('/users', userController.getAllUsers); // Get all users
router.get('/users/:email', userController.getUserByEmail); // Get user by email

module.exports = router;