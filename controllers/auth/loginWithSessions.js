const { User } = require('../../models/user');
const UAParser = require('ua-parser-js');
const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const createTokens = require('../../helpers/createTokens');
const jwt = require('jsonwebtoken');
const { REFRESH_SECRET_KEY } = process.env;

const removeDeadSessions = userSessions => {
  userSessions.forEach((session, index) => {
    try {
      console.log(session);
      jwt.verify(session.refreshToken, REFRESH_SECRET_KEY);
    } catch (error) {
      console.log('error', error);
      userSessions.splice(index, 1);
    }
  });
};

const findCurrentSessionIndex = ({ userSessions, userDeviceInfo }) => {
  let index = -1;
  for (let i = 0; i < userSessions.length; i++) {
    if (userSessions[i].userDeviceInfo === userDeviceInfo) {
      index = i;
      break;
    }
  }
  return index;
};

const loginWithSessions = async (req, res) => {
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

  const objectUser = user.toObject();
  let userSessions = objectUser.userSessions;
  if (!userSessions) {
    userSessions = [];
  }

  // Remove dead sessions
  removeDeadSessions(userSessions);

  if (userSessions.length >= 5) {
    // Implement alternative login procedure, temporaty throw an error
    throw HttpError(403, 'Too many active sessions');
  }

  const userDeviceInfo = JSON.stringify(UAParser(req.headers['user-agent']));
  // find current session
  const sessionIndex = findCurrentSessionIndex({ userSessions, userDeviceInfo });

  if (sessionIndex !== -1) {
    // Session for current user is already present, return existed tokens
    res.json({
      accessToken: userSessions[sessionIndex].accessToken,
      refreshToken: userSessions[sessionIndex].refreshToken,
      user: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
      },
    });
  } else {
    // If there are no sessions for current user - create new one and return new tokens
    const tokens = createTokens(user._id);
    userSessions.push({ ...tokens, userDeviceInfo });
    await User.findByIdAndUpdate(user._id, { userSessions });

    res.json({
      ...tokens,
      user: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
      },
    });
  }
};

module.exports = loginWithSessions;
