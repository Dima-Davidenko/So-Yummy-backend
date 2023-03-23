const { ACCESS_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

const removeEmailFromSubscriptionList = async (req, res) => {
  const { emailToken } = req.body;
  const { email } = jwt.verify(emailToken, ACCESS_SECRET_KEY);
  if (email) {
    const users = await User.find({ $match: { subscribeList: { $in: [email] } } });
    users.forEach(async user => {
      const leanUser = user.toObject();
      const subscribeList = leanUser.subscribeList;
      const newList = subscribeList.filter(savedEmail => savedEmail !== email);
      user.subscribeList = newList;
      await user.save();
    });
  }
  res.json({ message: 'Success' });
};

module.exports = removeEmailFromSubscriptionList;
