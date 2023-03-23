const { Recipe } = require('../../models/recipe');
const { listRecipeResponse } = require('../../helpers');

const getMainPage = async (req, res) => {
  const options = [
    { $sample: { size: 4 } },
    { $limit: 4 },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        ingredients: 0,
        area: 0,
        tags: 0,
        thumb: 0,
      },
    },
  ];
  const result = await Recipe.aggregate([
    {
      $facet: {
        breakfast: [{ $match: { category: 'Breakfast' } }, ...options],
        vegan: [{ $match: { category: 'Vegan' } }, ...options],
        miscellaneous: [{ $match: { category: 'Miscellaneous' } }, ...options],
        dessert: [{ $match: { category: 'Dessert' } }, ...options],
      },
    },
  ]);

  const breakfast = listRecipeResponse(result[0].breakfast, req.user._id);
  const vegan = listRecipeResponse(result[0].vegan, req.user._id);
  const miscellaneous = listRecipeResponse(result[0].miscellaneous, req.user._id);
  const dessert = listRecipeResponse(result[0].dessert, req.user._id);

  res.json({ breakfast, vegan, miscellaneous, dessert });
};

module.exports = getMainPage;
