const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Teacher-only route
router.get('/teacher/courses', [authMiddleware, roleMiddleware('teacher')], async (req, res) => {
  try {
    res.send('Welcome to the Teacher Courses Management!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;