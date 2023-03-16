const { Recipe } = require('../../models/recipe');
const {
  getSkipLimitPage,
  getRegexForSearchByTitleAndIngredient,
  getSortTypeByTitleOrPopularity,
  getFacetObject,
  processPagedRecipesResult,
} = require('../../helpers');

const searchByTitle = async (req, res) => {
  const { query } = req.params;
  const regex = getRegexForSearchByTitleAndIngredient(query);

  const userId = req.user._id;

  const { page: sPage = 1, limit: sLimit = 12, sort: sSort } = req.query;

  const { skip, limit, page } = getSkipLimitPage({ page: sPage, limit: sLimit });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

  const result = await Recipe.aggregate([
    { $match: { title: { $regex: regex } } },
    {
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = processPagedRecipesResult({ result, userId });

  res.json({ ...response, page, limit, sort });
};

module.exports = searchByTitle;
