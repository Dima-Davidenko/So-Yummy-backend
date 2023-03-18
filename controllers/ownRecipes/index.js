const { ctrlWrapper } = require('../../helpers');
const addOwnRecipe = require('./addOwnRecipe');
const getOwnRecipes = require('./getOwnRecipes');
const getOwnRecipeById = require('./getOwnRecipeById');
const deleteOwnById = require('./deleteOwnById');

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  getOwnRecipeById: ctrlWrapper(getOwnRecipeById),
  deleteOwnById: ctrlWrapper(deleteOwnById),
};
