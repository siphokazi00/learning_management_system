const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Unauthorized: No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const statusCode = err.name === 'TokenExpiredError' ? 401 : 403;
    const errorMessage = err.name === 'TokenExpiredError' ? 'Unauthorized: Token has expired.' : 'Unauthorized: Invalid token.';
    console.error('Authentication error:', err.message);
    return res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = authMiddleware;