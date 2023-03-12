const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const createTokens = require('../../helpers/createTokens');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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
  const tokens = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, { ...tokens });

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
