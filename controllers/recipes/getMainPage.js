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

  const breakfast = listRecipeResponse(result[0].breakfast);
  const vegan = listRecipeResponse(result[0].vegan);
  const miscellaneous = listRecipeResponse(result[0].miscellaneous);
  const dessert = listRecipeResponse(result[0].dessert);

  res.json({ breakfast, vegan, miscellaneous, dessert });
};

module.exports = getMainPage;
