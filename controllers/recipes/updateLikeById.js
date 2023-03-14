const { Recipe } = require('../../models/recipe');
const toggleFavoriteLikeState = require('../../helpers/toggleFavoriteLikeState');

const updateLikeById = async (req, res) => {
  const { _id, likeOrFavorite: like } = await toggleFavoriteLikeState({
    type: 'likes',
    req,
    Model: Recipe,
  });
  res.status(200).json({ _id, like });
};

module.exports = updateLikeById;
