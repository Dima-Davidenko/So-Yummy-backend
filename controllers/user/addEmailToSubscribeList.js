const { MAX_SUBSCRIBELIST_LENGTH } = require('../../data/constants');
const { ACCESS_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { HttpError, sendEmail } = require('../../helpers');
const subscriptionConfirmTemplate = require('../../data/emailTemplates/subscriptionConfirmTemplate');

const addEmailToSubscribeList = async (req, res) => {
  const { email } = req.body;
  const user = req.user.toObject();
  if (!user.subscribeList) {
    user.subscribeList = [];
  }
  if (user.subscribeList.length >= MAX_SUBSCRIBELIST_LENGTH) {
    throw HttpError(
      403,
      `You have reached the maximum length (${MAX_SUBSCRIBELIST_LENGTH}) of your subscribe list`
    );
  }
  if (user.subscribeList.includes(email)) {
    throw HttpError(409, `Email ${email} is already in your subscribe list`);
  }
  user.subscribeList.push(email);
  req.user.subscribeList = user.subscribeList;
  const payload = { email };
  const unsubscribeToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '30d' });
  await req.user.save();
  const subscribeConfirmEmail = {
    to: email,
    subject: 'Subscription Confirm Email',
    html: subscriptionConfirmTemplate(unsubscribeToken),
  };
  await sendEmail(subscribeConfirmEmail);
  res.json({ subscribeList: user.subscribeList });
};

module.exports = addEmailToSubscribeList;
