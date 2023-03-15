const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');
const { Ingridient } = require('../../models/ingridient');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, null, { lean: true }).populate({
    path: 'ingridients.id',
    model: Ingridient,
  });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }
  result.ingridients.forEach(ingr => {
    ingr._id = ingr.id._id;
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
    ingridients,
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
    ingridients,
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
