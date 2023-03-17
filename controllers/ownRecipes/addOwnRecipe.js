const { OwnRecipe } = require('../../models/ownRecipe');
const { MAX_RECIPES_NUMBER } = require('../../data/constants');
const { HttpError, resizeImg, uploadImageToCloudinary } = require('../../helpers');

const addOwnRecipe = async (req, res) => {
  if (req.user.ownRecipesNumber >= MAX_RECIPES_NUMBER) {
    throw HttpError(
      403,
      `You have reached the maximum number of your recipes (${MAX_RECIPES_NUMBER}).`
    );
  }
  // let preview = '';
  // if (req.file) {
  //   const saveAvatarURL = async result => {
  //     const avatarURL = result.secure_url;
  //     user = await User.findByIdAndUpdate(req.user._id, { name, avatarURL }, { new: true });
  //     res.json({ name: user.name, email: user.email, avatarURL: user.avatarURL });
  //   };
  //   const buffer = await resizeImg({ body: req.file.buffer, width: 350, height: 350 });
  //   await uploadImageToCloudinary(buffer, saveAvatarURL);
  // }
  const { title, category, about, instructions, time, favorite, ingredients } = req.body;
  const newRecipe = await OwnRecipe.create({
    title,
    category,
    about,
    instructions,
    time,
    favorite,
    ingredients,
    owner: req.user._id,
  });
  res.json(newRecipe);
};

module.exports = addOwnRecipe;
