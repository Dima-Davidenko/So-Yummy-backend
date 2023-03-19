const getShoppingList = require('./getShoppingList');
const addProductToShoppingList = require('./addProductToShoppingList');
const removeProductTFromShoppingList = require('./removeProductTFromShoppingList');
const setUserData = require('./setUserData');
const addEmailToSubscribeList = require('./addEmailToSubscribeList');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
  addProductToShoppingList: ctrlWrapper(addProductToShoppingList),
  removeProductTFromShoppingList: ctrlWrapper(removeProductTFromShoppingList),
  setUserData: ctrlWrapper(setUserData),
  addEmailToSubscribeList: ctrlWrapper(addEmailToSubscribeList),
};
