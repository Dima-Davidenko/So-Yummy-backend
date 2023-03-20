const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { BASE_FRONTEND_URL } = process.env;
const { sendEmail } = require('../../helpers');
const { nanoid } = require('nanoid');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL =
    'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1679336722/images_s8wrdd.jpg';
  const verificationToken = nanoid();
  const lowCaseEmail = email.toLowerCase();
  const user = await User.create({
    name,
    email: lowCaseEmail,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const verificationEmail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="${BASE_FRONTEND_URL}/verification-token/${verificationToken}">Click to verify your Email</a>`,
  };
  await sendEmail(verificationEmail);

  res.json({
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = register;
