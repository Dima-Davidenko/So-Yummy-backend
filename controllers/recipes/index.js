const { ctrlWrapper } = require('../../helpers');
const addRecipe = require('./addRecipe');
const getAll = require('./getAll');
const getRecipeById = require('./getRecipeById');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getRecipeById),
  addRecipe: ctrlWrapper(addRecipe),
};
