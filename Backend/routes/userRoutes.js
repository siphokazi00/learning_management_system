const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User Routes
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:email', userController.getUserByEmail); // Get user by email
router.put('/:email', userController.updateUser); // Update user by email
router.delete('/:email', userController.deleteUser); // Delete user by email

module.exports = router;