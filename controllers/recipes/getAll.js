const { Recipe } = require('../../models/recipe');

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const result = await Recipe.find(null, '-createdAt -updatedAt', options);
  const recipes = result.map(recipe => {
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
      likes,
      favorites,
    } = recipe;
    const like = likes.includes(req.user._id);
    const favorite = favorites.includes(req.user._id);
    return {
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
      like,
      favorite,
    };
  });

  res.json(recipes);
};

module.exports = getAll;
