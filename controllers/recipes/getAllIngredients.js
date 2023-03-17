const { Ingredient } = require('../../models/ingredient');

const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find(null, '-t');

  res.json({ ingredients });
};

module.exports = getAllIngredients;
