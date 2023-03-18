const { HttpError } = require('../../helpers');
const { OwnRecipe } = require('../../models/ownRecipe');
const { Ingredient } = require('../../models/ingredient');

const getOwnRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await OwnRecipe.findById(id, null, { lean: true }).populate({
    path: 'ingredients.id',
    model: Ingredient,
  });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }
  result.ingredients.forEach(ingr => {
    ingr.title = ingr.id.ttl;
    ingr.desc = ingr.id.desc;
    ingr.thumb = ingr.id.thb;
    ingr._id = ingr.id._id;
    delete ingr.id;
  });
  const { _id, title, category, description, instructions, thumb, time, ingredients, preview } =
    result;
  res.json({
    _id,
    title,
    category,
    description,
    instructions,
    ingredients,
    time,
    previewImg: preview,
    fullImage: thumb,
  });
};

module.exports = getOwnRecipeById;
