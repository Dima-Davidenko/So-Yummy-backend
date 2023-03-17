const { OwnRecipe } = require('../../models/ownRecipe');

const getOwnRecipes = async (req, res) => {
  const recipes = await OwnRecipe.find({ owner: { $in: [req.user._id] } });
  res.json({ recipes });
};

module.exports = getOwnRecipes;
