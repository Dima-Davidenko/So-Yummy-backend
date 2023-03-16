const { Recipe } = require('../../models/recipe');
const { OwnRecipe } = require('../../models/ownRecipe');

const getFavorite = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const promiseArr = [
    Recipe.find({ favorites: { $in: [userId] } }, '-createdAt -updatedAt').sort({
      popularity: 1,
    }),
    OwnRecipe.find({ favorite: true }),
  ];

  const [favoriteGeneralRecepes, favoriteOwnRecepes] = await Promise.all(promiseArr);
  favoriteOwnRecepes.forEach(recipe => {
    recipe.own = true;
  });
  const result = [...favoriteOwnRecepes, ...favoriteGeneralRecepes];

  const recipesCommon = result.map(recipe => {
    const {
      _id,
      title,
      category = '',
      preview = '',
      time = '',
      description = '',
      own = false,
    } = recipe;
    return {
      _id,
      title,
      category,
      description,
      time,
      preview,
      own,
    };
  });

  const paginatedRecipes = recipesCommon.slice(skip, skip + limit);

  res.json({ favoriteRecipes: paginatedRecipes, total: recipesCommon.length, page, limit });
};

module.exports = getFavorite;
