const categoriesArray = require('../../data/categoriesArray');
const { HttpError, listRecipeResponse } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  if (!categoriesArray.includes(category)) {
    throw HttpError(400);
  }
  const { page = 1, limit = 12 } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const result = await Recipe.find({ category }, '-createdAt -updatedAt', options).sort({
    title: 1,
  });
  const recipes = listRecipeResponse(result, req.user._id);
  res.json(recipes);
};

module.exports = getRecipesByCategory;
