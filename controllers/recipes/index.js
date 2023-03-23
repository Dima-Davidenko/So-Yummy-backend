const { ctrlWrapper } = require('../../helpers');
const getAll = require('./getAll');
const getMainPage = require('./getMainPage');
const getRecipeById = require('./getRecipeById');
const getAllCategories = require('./getAllCategories');
const getRecipesByCategory = require('./getRecipesByCategory');
const getFavorite = require('./getFavorite');
const updateFavoriteById = require('./updateFavoriteById');
const updateLikeById = require('./updateLikeById');
const searchByTitle = require('./searchByTitle');
const searchByIngredient = require('./searchByIngredient');
const getAllIngredients = require('./getAllIngredients');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getMainPage: ctrlWrapper(getMainPage),
  getById: ctrlWrapper(getRecipeById),
  getAllCategories: ctrlWrapper(getAllCategories),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  getFavorite: ctrlWrapper(getFavorite),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  updateLikeById: ctrlWrapper(updateLikeById),
  searchByTitle: ctrlWrapper(searchByTitle),
  searchByIngredient: ctrlWrapper(searchByIngredient),
  getAllIngredients: ctrlWrapper(getAllIngredients),
};
