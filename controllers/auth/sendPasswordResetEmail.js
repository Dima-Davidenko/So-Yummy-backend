const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
const jwt = require('jsonwebtoken');
const passwordResetEmailTemplate = require('../../data/emailTemplates/passwordResetEmailTemplate');
const { ACCESS_SECRET_KEY } = process.env;

const sendPasswordResetEmail = async (req, res) => {
  // Get request data
  const { email } = req.body;
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

  // Allowed time between passwords reset procedures is 60 second
  const diffTime = Date.now() - user.passwordResetTime;
  const timeLeft = Math.round((60000 - diffTime) / 1000);
  if (timeLeft > 0) {
    throw HttpError(425, `${timeLeft}`);
  }

  // Reset time of the beginning of new password reset procedure
  user.passwordResetTime = Date.now();

  // Change procedure stage status
  user.passwordResetStage = 'email token has been sent';

  // Save reset token
  user.verificationToken = resetToken;
  await user.save();

  // Send email
  const verificationEmail = {
    to: email,
    subject: 'Password reset',
    html: passwordResetEmailTemplate(user.verificationToken),
  };
  await sendEmail(verificationEmail);

  res.json({ message: 'Email with link to reset password has been sent' });
};

module.exports = sendPasswordResetEmail;
