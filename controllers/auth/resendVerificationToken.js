const { User } = require('../../models/user');
const { BASE_URL } = process.env;
const { HttpError, sendEmail } = require('../../helpers');

const resendVerificationToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'Email not found');
  }
  if (!user.verificationToken) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await User.findOneAndUpdate(user._id, { verify: true, verificationToken: '' });
  const verificationEmail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your Email</a>`,
  };
  await sendEmail(verificationEmail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerificationToken;
