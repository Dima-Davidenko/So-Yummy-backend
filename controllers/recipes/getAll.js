const { listRecipeResponse } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getAll = async (req, res) => {
  const { page = 1, limit = 300, popular = false } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const sortOpts = {};
  if (popular) {
    sortOpts.popularity = 1;
  } else {
    sortOpts.title = 1;
  }
  const result = await Recipe.find(null, '-createdAt -updatedAt', options).sort(sortOpts);
  const recipes = listRecipeResponse(result, req.user._id);

  res.json(recipes);
};

module.exports = getAll;
