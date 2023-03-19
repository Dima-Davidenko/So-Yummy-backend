const { MAX_SUBSCRIBELIST_LENGTH } = require('../../data/constants');
const { HttpError } = require('../../helpers');

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
  console.log(req.user.subscribeList);
  await req.user.save();
  res.json({ subscribeList: user.subscribeList });
};

module.exports = addEmailToSubscribeList;
