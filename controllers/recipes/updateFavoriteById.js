const { Recipe } = require('../../models/recipe');
const toggleFavoriteLikeState = require('../../helpers/toggleFavoriteLikeState');

const updateFavoriteById = async (req, res) => {
  const {
    _id,
    likeOrFavorite: favorite,
    popularity,
  } = await toggleFavoriteLikeState({
    type: 'favorites',
    req,
    Model: Recipe,
  });
  res.status(200).json({ _id, favorite, popularity });
};

module.exports = updateFavoriteById;
