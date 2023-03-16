const { Recipe } = require('../../models/recipe');
const categoriesArray = require('../../data/categoriesArray');
const {
  HttpError,
  getSkipLimitPage,
  getSortTypeByTitleOrPopularity,
  getFacetObject,
  processPagedRecipesResult,
} = require('../../helpers');

const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  if (!categoriesArray.includes(category)) {
    throw HttpError(400);
  }
  const userId = req.user._id;
  const { page: sPage = 1, limit: sLimit = 12, sort: sSort } = req.query;

  const { skip, limit, page } = getSkipLimitPage({ page: sPage, limit: sLimit });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

  const result = await Recipe.aggregate([
    { $match: { category: category } },
    {
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = processPagedRecipesResult({ result, userId });

  res.json({ ...response, page, limit, sort });
};

module.exports = getRecipesByCategory;
