const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const error = new Error('Access denied. Insufficient permissions.');
      error.status = 403;
      return next(error);
    }
    next();
  };
};

module.exports = roleMiddleware;