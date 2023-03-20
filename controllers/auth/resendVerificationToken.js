const { User } = require('../../models/user');
const { BASE_FRONTEND_URL } = process.env;
const { HttpError, sendEmail } = require('../../helpers');
const bcrypt = require('bcryptjs');

const resendVerificationToken = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(403, 'Email or password is wrong');
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(403, 'Email or password is wrong');
  }
  if (!user.verificationToken) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verificationEmail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="${BASE_FRONTEND_URL}/api/users/verify/${user.verificationToken}">Click to verify your Email</a>`,
  };
  await sendEmail(verificationEmail);

  res.json({
    message: 'Verification email is sent',
  });
};

module.exports = resendVerificationToken;
