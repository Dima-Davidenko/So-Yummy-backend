const { OwnRecipe } = require('../../models/ownRecipe');
const { HttpError } = require('../../helpers');

const updateOwnFavoriteById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;
  const recipe = await OwnRecipe.findById(recipeId);
  if (!recipe) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
  }
  if (`${recipe.owner}` !== `${userId}`) {
    throw HttpError(403);
  }
  recipe.favorite = !recipe.favorite;
  const { _id, favorite } = await recipe.save();
  res.status(200).json({ _id, favorite });
};

module.exports = updateOwnFavoriteById;
