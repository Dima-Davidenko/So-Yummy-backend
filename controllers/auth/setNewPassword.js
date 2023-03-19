const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = process.env;

const setNewPassword = async (req, res) => {
  // Get request data
  const { email, resetPasswordToken, password } = req.body;
  const lowCaseEmail = email.toLowerCase();

  // User data validation
  const user = await User.findOne({ email: lowCaseEmail });
  if (!user) {
    throw HttpError(403, 'Email is wrong');
  }
  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }

  // Password change procedure
  const { savedEmail } = jwt.verify(resetPasswordToken, ACCESS_SECRET_KEY);
  if (
    savedEmail !== user.email ||
    savedEmail !== lowCaseEmail ||
    !user.verificationToken ||
    user.password !== resetPasswordToken ||
    user.passwordResetStage !== 'password has been reset'
  ) {
    throw HttpError(409);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  user.verificationToken = null;
  user.passwordResetStage = '';
  await user.save();
  res.json({ message: 'Success' });
};

module.exports = setNewPassword;
