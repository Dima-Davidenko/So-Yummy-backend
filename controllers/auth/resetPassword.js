const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = process.env;

const resetPassword = async (req, res) => {
  // Get request data
  const { email, resetEmailToken } = req.body;
  const lowCaseEmail = email.toLowerCase();

  // User data validation
  const user = await User.findOne({ email: lowCaseEmail });
  if (!user) {
    throw HttpError(403, 'Email is wrong');
  }
  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }

  // Generate encrypted email reset token
  const payload = {
    savedEmail: lowCaseEmail,
  };
  const resetToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '5m' });

  // Password reset and change on token with encrypted email
  const { savedEmail } = jwt.verify(resetEmailToken, ACCESS_SECRET_KEY);
  if (
    savedEmail !== lowCaseEmail ||
    resetEmailToken !== user.verificationToken ||
    user.passwordResetStage !== 'email token has been sent'
  ) {
    throw HttpError(409);
  }

  user.password = resetToken;
  user.passwordResetStage = 'password has been reset';
  await user.save();
  res.json({ resetPasswordToken: resetToken });
};

module.exports = resetPassword;
