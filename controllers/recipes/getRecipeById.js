const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');
const { Ingredient } = require('../../models/ingredient');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, null, { lean: true }).populate({
    path: 'ingredients.id',
    model: Ingredient,
  });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }
  console.log(result);
  result.ingredients.forEach(ingr => {
    ingr.title = ingr.id.ttl;
    ingr.desc = ingr.id.desc;
    ingr.type = ingr.id.t;
    ingr.thumb = ingr.id.thb;
    delete ingr.id;
  });
  const {
    _id,
    title,
    category,
    description,
    area,
    instructions,
    thumb,
    time,
    popularity,
    youtube,
    tags,
    ingredients,
    favorites,
    likes,
    preview,
  } = result;
  const like = likes.includes(req.user._id);
  const favorite = favorites.includes(req.user._id);
  res.json({
    _id,
    title,
    category,
    description,
    instructions,
    ingredients,
    time,
    popularity,
    favorite,
    like,
    previewImg: preview,
    fullImage: thumb,
    area,
    tags,
    youtube,
  });
};

module.exports = getRecipeById;
