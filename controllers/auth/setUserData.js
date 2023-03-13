const { User } = require('../../models/user');

const { resizeImg, uploadImageToCloudinary } = require('../../helpers');

const setUserData = async (req, res) => {
  let user;
  const name = req.body.name;
  if (!req.file) {
    user = await User.findByIdAndUpdate(req.user._id, { name }, { new: true });
    res.json({ name: user.name, email: user.email, avatarURL: user.avatarURL });
  } else {
    const saveAvatarURL = async result => {
      const avatarURL = result.secure_url;
      user = await User.findByIdAndUpdate(req.user._id, { name, avatarURL }, { new: true });
      res.json({ name: user.name, email: user.email, avatarURL: user.avatarURL });
    };
    const buffer = await resizeImg({ body: req.file.buffer, width: 150, height: 150 });
    await uploadImageToCloudinary(buffer, saveAvatarURL);
  }
};

module.exports = setUserData;
