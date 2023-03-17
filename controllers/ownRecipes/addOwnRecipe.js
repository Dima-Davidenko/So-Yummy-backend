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
  const { title, category, about, instructions, time, favorite, ingredients } = req.body;
  if (req.file) {
    const saveAvatarURL = async result => {
      const preview = result.secure_url;
      const newRecipe = await OwnRecipe.create({
        title,
        category,
        about,
        instructions,
        time,
        favorite,
        ingredients,
        preview,
        owner: req.user._id,
      });
      res.json(newRecipe);
    };
    const buffer = await resizeImg({ body: req.file.buffer, width: 350, height: 350 });
    await uploadImageToCloudinary(buffer, saveAvatarURL);
  } else {
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
  }
};

module.exports = addOwnRecipe;
