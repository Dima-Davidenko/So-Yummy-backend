const { ACCESS_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

const removeEmailFromSubscriptionList = async (req, res) => {
  const { emailToken } = req.params;
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
  res.send(
    '<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Email has been removed from subscription list</title></head><body><h1>Your Email has been removed from subscription list</h1></body></html>'
  );
};

module.exports = removeEmailFromSubscriptionList;
