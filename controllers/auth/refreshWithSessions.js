const createTokens = require('../../helpers/createTokens');
const { REFRESH_SECRET_KEY, ACCESS_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const refreshWithSessions = async (req, res, next) => {
  const { refreshToken } = req.body;
  // Check access token, if valid - send saved tokens
  try {
    const { authorization = '' } = req.headers;
    const [bearer, accessToken] = authorization.split(' ');
    const { id } = jwt.verify(accessToken, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    const { userSessions } = user.toObject() || [];
    let isValidSession = false;
    for (let i = 0; i < userSessions.length; i++) {
      if (userSessions[i].accessToken === accessToken) {
        isValidSession = userSessions[i];
        break;
      }
    }
    if (isValidSession) {
      const { accessToken, refreshToken } = isValidSession;
      res.json({
        accessToken,
        refreshToken,
      });
      return;
    }
  } catch (error) {}

  const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  const user = await User.findById(id);
  if (!user) {
    throw HttpError(400, 'Invalid refresh token');
  }
  const { userSessions } = user.toObject() || [];
  let isValidSession = false;
  let index;
  for (index = 0; index < userSessions.length; index++) {
    if (userSessions[index].refreshToken === refreshToken) {
      isValidSession = true;
      break;
    }
  }
  if (!isValidSession) {
    throw HttpError(400, 'Invalid refresh token');
  }

  const tokens = createTokens(id);
  userSessions[index] = { ...userSessions[index], ...tokens };
  user.userSessions = userSessions;
  await user.save();

  res.json({
    ...tokens,
  });
};

module.exports = refreshWithSessions;
