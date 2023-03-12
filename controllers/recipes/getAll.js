const { listRecipeResponse } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getAll = async (req, res) => {
  const { page = 1, limit = 300 } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const result = await Recipe.find(null, '-createdAt -updatedAt', options);
  const recipes = listRecipeResponse(result, req.user._id);

  res.json(recipes);
};

module.exports = getAll;
