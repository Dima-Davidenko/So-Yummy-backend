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

  // If motivations field isn't created - create it
  if (user.motivations?.useApp100days === undefined) {
    user.motivations = { useApp100days: false };
    await user.save();
  }
  // If user has been registered for 100 or more days - send motivation '100'
  let motivation;
  if (!user.motivations?.useApp100days) {
    if (Date.now() - user.createdAt >= 8.64e9) {
      motivation = '100';
      if (!user.motivations?.useApp100days) {
        user.motivations = { useApp100days: true };
      } else {
        user.motivations.useApp100days = true;
      }
      await user.save();
    }
  }

  // Remove dead sessions
  removeDeadSessions(userSessions);

  if (userSessions.length >= 5) {
    // Implement alternative login procedure, temporaty throw an error
    throw HttpError(403, 'Too many active sessions');
  }

  const userDeviceInfo = JSON.stringify(UAParser(req.headers['user-agent']));
  if (!userDeviceInfo) {
    console.log('=======================ERROR Empty User Device Info===========================');
    throw HttpError(403);
  }
  // find current session
  const sessionIndex = findCurrentSessionIndex({ userSessions, userDeviceInfo });
  console.log('========User Device Info =============');
  console.log(userDeviceInfo);
  console.log(req.ip);
  console.log(req.ips);
  console.log('======================================');

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
      motivation,
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
      motivation,
    });
  }
};

module.exports = loginWithSessions;
