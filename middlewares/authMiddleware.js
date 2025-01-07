const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided, redirecting to login.');
    return res.status(401).json({ error: 'Unauthorized: No token provided.' }); // Return error instead of redirect
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token.' }); // Return error instead of redirect
  }
};

module.exports = authMiddleware;