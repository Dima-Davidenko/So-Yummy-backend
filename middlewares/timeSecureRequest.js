const { HttpError } = require('../helpers');

const timeSecureRequest = (delay = 1000) => {
  return async (req, res, next) => {
    const timeSinceLastDBSecureRequest =
      req.user?.timeSinceLastDBSecureRequest || Date.now() - 2000;
    if (Date.now() - timeSinceLastDBSecureRequest < delay) {
      next(HttpError(403, `Too many requests`));
    } else {
      req.user.timeSinceLastDBSecureRequest = Date.now();
      try {
        await req.user.save();
      } catch (error) {
        console.log(error.message);
      }
    }
    next();
  };
};

module.exports = timeSecureRequest;
