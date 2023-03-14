const { ctrlWrapper } = require('../../helpers');
const getAll = require('./getAll');
const getRecipeById = require('./getRecipeById');
const getAllCategories = require('./getAllCategories');
const getRecipesByCategory = require('./getRecipesByCategory');
const getFavorite = require('./getFavorite');
const updateFavoriteById = require('./updateFavoriteById');
const updateLikeById = require('./updateLikeById');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getRecipeById),
  getAllCategories: ctrlWrapper(getAllCategories),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  getFavorite: ctrlWrapper(getFavorite),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  updateLikeById: ctrlWrapper(updateLikeById),
};
