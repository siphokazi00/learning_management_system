const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Teacher-only route
router.get('/teacher/courses', authMiddleware, roleMiddleware('teacher'), (req, res) => {
  res.send('Welcome to the Teacher Courses Management!');
});

module.exports = router;