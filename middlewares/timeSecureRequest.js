const { HttpError } = require('../helpers');

const timeSecureRequest = (delay = 1000) => {
  return async (req, res, next) => {
    if (Date.now() - req.user.timeSinceLastDBSecureRequest < delay) {
      next(HttpError(403, `Too many requests`));
    } else {
      req.user.timeSinceLastDBSecureRequest = Date.now();
      await req.user.save();
    }
    next();
  };
};

module.exports = timeSecureRequest;
