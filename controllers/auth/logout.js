const { User } = require('../../models/user');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { accessToken: null, refreshToken: null });
  res.status(204).json({});
};

module.exports = logout;
