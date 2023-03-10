const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw HttpError(404, `Recipe with ${id} not found`);
  }
  const favorite = result.favorites.includes(req.user._id);
  const {
    _id,
    title,
    category,
    area,
    instructions,
    thumb,
    time,
    popularity,
    youtube,
    tags,
    ingridients,
  } = result;
  res.json({
    _id,
    title,
    category,
    area,
    instructions,
    thumb,
    time,
    popularity,
    youtube,
    tags,
    ingridients,
    favorite,
  });
};

module.exports = getRecipeById;
