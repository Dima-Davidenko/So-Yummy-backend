const { ctrlWrapper } = require('../../helpers');
const addOwnRecipe = require('./addOwnRecipe');
const updateOwnFavoriteById = require('./updateOwnFavoriteById');

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  updateOwnFavoriteById: ctrlWrapper(updateOwnFavoriteById),
};
