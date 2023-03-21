const { OwnRecipe } = require('../../models/ownRecipe');
const { MAX_RECIPES_NUMBER } = require('../../data/constants');
const { HttpError, resizeImg, uploadImageToCloudinary } = require('../../helpers');

const addOwnRecipe = async (req, res) => {
  const ownRecipesNumber = await OwnRecipe.countDocuments({ owner: { $in: [req.user._id] } });
  if (ownRecipesNumber >= MAX_RECIPES_NUMBER) {
    throw HttpError(
      403,
      `You have reached the maximum number of your recipes (${MAX_RECIPES_NUMBER}).`
    );
  }
  const { title, category, about, instructions, time, favorite, ingredients, description } =
    req.body;
  // If first recipe is being adding to recipe list - send motivation 'first'
  let motivation;
  if (!req.user.motivations?.addFirstOwnRecipe) {
    req.user.motivations.addFirstOwnRecipe = true;
    await req.user.save();
    motivation = 'first';
  }
  if (req.file) {
    let newRecipe;
    const createRecipeAndSavePreviewUrl = async result => {
      const preview = result.secure_url;
      newRecipe = await OwnRecipe.create({
        title,
        category,
        about,
        instructions,
        description,
        time,
        favorite,
        ingredients,
        preview,
        owner: req.user._id,
      });
      if (newRecipe) {
        req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
        req.user.save();
        res.json({
          id: newRecipe._id,
          message: `Recipe ${newRecipe._id} has been created`,
          motivation,
        });
      } else {
        res.json({ message: 'An error occured' });
      }
    };
    try {
      const preview = await resizeImg({ body: req.file, width: 350, height: 350 });
      await uploadImageToCloudinary(preview, createRecipeAndSavePreviewUrl, req.user._id);
    } catch (error) {
      console.log(error.message);
    }
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
    if (newRecipe) {
      req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
      req.user.save();
      res.json({
        id: newRecipe._id,
        message: `Recipe ${newRecipe._id} has been created`,
        motivation,
      });
    } else {
      res.json({ message: 'An error occured' });
    }
  }
};

module.exports = addOwnRecipe;
