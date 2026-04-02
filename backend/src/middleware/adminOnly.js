const ApiError = require('../utils/apiError');

module.exports = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  return next();
};
