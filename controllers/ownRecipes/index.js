const { ctrlWrapper } = require('../../helpers');
const addOwnRecipe = require('./addOwnRecipe');
const getOwnRecipes = require('./getOwnRecipes');
const deleteOwnById = require('./deleteOwnById');

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  deleteOwnById: ctrlWrapper(deleteOwnById),
};
