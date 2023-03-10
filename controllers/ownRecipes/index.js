const { ctrlWrapper } = require('../../helpers');
const addOwnRecipe = require('./addOwnRecipe');

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
};
