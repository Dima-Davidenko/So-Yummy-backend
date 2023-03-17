const { ctrlWrapper } = require('../../helpers');
const addOwnRecipe = require('./addOwnRecipe');
const getOwnRecipes = require('./getOwnRecipes');
const deleteOwnFavoriteById = require('./deleteOwnFavoriteById');

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  deleteOwnFavoriteById: ctrlWrapper(deleteOwnFavoriteById),
};
