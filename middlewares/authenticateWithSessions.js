const { User } = require('../models/user');

const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');

const { ACCESS_SECRET_KEY } = process.env;

const authenticateWithSessions = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(accessToken, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    const { userSessions } = user.toObject() || [];
    let isValidSession = false;
    for (let i = 0; i < userSessions.length; i++) {
      if (userSessions[i].accessToken === accessToken) {
        isValidSession = true;
        break;
      }
    }
    if (!isValidSession) {
      next(HttpError(401));
    }

    req.user = user;
    req.accessToken = accessToken;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authenticateWithSessions;
