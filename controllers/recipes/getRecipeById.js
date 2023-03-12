const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');
const { Ingridient } = require('../../models/ingridient');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, null, { lean: true });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} not found`);
  }
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
    favorites,
    likes,
    preview,
  } = result;
  const like = likes.includes(req.user._id);
  const favorite = favorites.includes(req.user._id);
  const arrIds = ingridients.map(({ id }) => id);
  // console.log('arrIds', arrIds);
  const fullIngrs = await Ingridient.find(
    {
      _id: arrIds,
    },
    null,
    { lean: true }
  );
  console.log('fullIngrs', fullIngrs);
  ingridients.forEach(ingridient => {
    // console.log('ingridient', ingridient);
    const info = fullIngrs.find(({ _id }) => {
      return `${_id}` === `${ingridient.id}`;
    });
    // console.log('info', info);
    delete ingridient.id;
    ingridient.description = info.desc;
    ingridient.title = info.ttl;
    ingridient.thumb = info.thb;
  });
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
    like,
    preview,
  });
};

module.exports = getRecipeById;
