const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protected route
router.get('/dashboard', 
  authMiddleware, 
  roleMiddleware(['Teacher', 'Admin']), 
  async (req, res, next) => {
    try {
      res.json({
        message: 'Welcome to the dashboard!',
        user: req.user, 
        role: req.user.role
      });
    } catch (err) {
      next(err);
    }
  }
);

// Add error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Add not found middleware
router.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;