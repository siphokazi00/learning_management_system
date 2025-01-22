const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();
const logger = console;

// Admin-only route
router.get('/admin/dashboard', 
  authMiddleware, 
  roleMiddleware('admin'), 
  async (req, res) => {
    try {
      logger.info('Admin dashboard accessed');
      res.status(200).send({ message: 'Welcome to the Admin Dashboard!' });
    } catch (error) {
      logger.error('Error accessing admin dashboard:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Add a route for handling 404 errors
router.use((req, res) => {
  logger.error('Route not found:', req.url);
  res.status(404).send({ error: 'Route not found' });
});

// Add error handling middleware
router.use((error, req, res, next) => {
  logger.error('Error occurred:', error);
  res.status(500).send({ error: 'Internal Server Error' });
});

module.exports = router;