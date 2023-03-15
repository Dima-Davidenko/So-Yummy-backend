const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const createTokens = require('../../helpers/createTokens');
const UAParser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const lowCaseEmail = email.toLowerCase();
  const user = await User.findOne({ email: lowCaseEmail });
  if (!user) {
    throw HttpError(403, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(403, 'Email or password is wrong');
  }
  const userDeviceInfo = JSON.stringify(UAParser(req.headers['user-agent']));

  if (user.userDeviceInfo && userDeviceInfo !== user.userDeviceInfo) {
    if (user.accessToken) {
      try {
        jwt.verify(user.accessToken, ACCESS_SECRET_KEY);
        throw new Error('forbidden');
      } catch (error) {
        if (error.message === 'forbidden') {
          throw HttpError(409, 'Only one active session is permitted');
        }
      }
    }
  }

  const tokens = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, { ...tokens, userDeviceInfo });

  res.json({
    ...tokens,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
