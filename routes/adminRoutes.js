const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Admin-only route
router.get('/admin/dashboard', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.send('Welcome to the Admin Dashboard!');
});

module.exports = router;