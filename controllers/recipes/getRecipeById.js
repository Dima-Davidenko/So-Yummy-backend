const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  console.log(result);
  if (!result) {
    throw HttpError(404, `Recipe with ${id} not found`);
  }
  res.json(result);
};

module.exports = getRecipeById;
