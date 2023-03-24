const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
const bcrypt = require('bcryptjs');
const emailConfirmTemplate = require('../../data/emailTemplates/emailConfirmTemplate');

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
    html: emailConfirmTemplate(user.verificationToken),
  };
  await sendEmail(verificationEmail);

  res.json({
    message: 'Verification email is sent',
  });
};

module.exports = resendVerificationToken;
