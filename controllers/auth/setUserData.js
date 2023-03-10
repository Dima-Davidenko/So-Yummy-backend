// const { User } = require('../../models/user');
// const path = require('path');
// const jimp = require('jimp');
// const fs = require('fs/promises');
// const { HttpError } = require('../../helpers');

// const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const setUserData = async (req, res) => {
  // if (!req.file) {
  //   throw HttpError(400, 'Avatar is required');
  // }
  // const { path: tempUpload, originalname } = req.file;
  // try {
  //   const avatarImg = await jimp.read(tempUpload);
  //   avatarImg.resize(250, 250).write(tempUpload);
  // } catch (err) {
  //   throw HttpError(500);
  // }
  // const { _id } = req.user;
  // const fileName = `${_id}_${originalname}`;
  // const resultUpload = path.join(avatarDir, fileName);
  // const avatarURL = path.join('avatars', fileName);
  // await fs.rename(tempUpload, resultUpload);
  // await User.findByIdAndUpdate(_id, { avatarURL });
  // res.json({
  //   avatarURL,
  // });
  //
  // Change code above
};

module.exports = setUserData;
