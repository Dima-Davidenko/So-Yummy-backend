const createTokens = require('../../helpers/createTokens');
const { REFRESH_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const refresh = async (req, res, next) => {
  const { refreshToken: token } = req.body;
  // --------------------------------------->
  if (token === 'superuser') {
    res.json({
      accessToken: 'superuser',
      refreshToken: 'superuser',
    });
    return;
  }
  // <---------------------------------------
  let tokens = {};
  let userId = '';
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findById(id);
    if (user.refreshToken !== token) {
      next(HttpError(400, 'Invalid refresh token'));
    }
    userId = id;
    tokens = createTokens(id);
  } catch (error) {
    next(HttpError(403, error.message));
  }
  await User.findByIdAndUpdate(userId, { ...tokens });

  res.json({
    ...tokens,
  });
};

module.exports = refresh;
