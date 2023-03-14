const { listRecipeResponse } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getFavorite = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 12, sort = false } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const sortOpts = {};
  if (sort === 'popular') {
    sortOpts.popularity = 1;
  } else {
    sortOpts.title = 1;
  }
  console.log(userId);
  const result = await Recipe.find(
    { favorites: { $in: [userId] } },
    '-createdAt -updatedAt',
    options
  ).sort(sortOpts);
  console.log(result);
  const recipes = listRecipeResponse(result, req.user._id);

  res.json(recipes);
};

module.exports = getFavorite;
