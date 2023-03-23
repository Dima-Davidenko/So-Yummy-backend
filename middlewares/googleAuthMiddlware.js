const { ACCESS_SECRET_KEY } = process.env;
const { HttpError } = require('../helpers');

const jwt = require('jsonwebtoken');

const googleAuthMiddlware = async (req, res, next) => {
  if (req.body?.email || req.body?.password) {
    next(HttpError(400));
  }
  try {
    const { googleAuthToken } = req.body;
    const { email, name, googlePassword } = jwt.verify(googleAuthToken, ACCESS_SECRET_KEY);
    req.body.email = email;
    req.body.name = name;
    req.body.googlePassword = googlePassword;
  } catch (error) {
    console.log(error.message);
    next(HttpError(400));
  }
  next();
};
module.exports = googleAuthMiddlware;
