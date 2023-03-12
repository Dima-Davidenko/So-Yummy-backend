const { ctrlWrapper } = require('../../helpers');
const getAll = require('./getAll');
const getRecipeById = require('./getRecipeById');
const getAllCategories = require('./getAllCategories');
const getRecipesByCategory = require('./getRecipesByCategory');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getRecipeById),
  getAllCategories: ctrlWrapper(getAllCategories),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
};
