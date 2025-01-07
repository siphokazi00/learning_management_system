const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the JWT auth middleware
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protected route
router.get('/dashboard', authMiddleware, roleMiddleware(['Teacher']), (req, res) => {
  res.json({
    message: 'Welcome to the dashboard!',
    user: req.user, // This comes from the authMiddleware
  });
});

module.exports = router;