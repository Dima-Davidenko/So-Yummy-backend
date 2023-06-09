const { Recipe } = require('../../models/recipe');
const {
  getSkipLimitPage,
  getSortTypeByTitleOrPopularity,
  processPagedRecipesResult,
  getFacetObject,
} = require('../../helpers');

const getFavorite = async (req, res) => {
  const userId = req.user._id;
  const { page: sPage = 1, limit: sLimit = 12, sort: sSort } = req.query;

  const { skip, limit, page } = getSkipLimitPage({ page: sPage, limit: sLimit });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

  const result = await Recipe.aggregate([
    { $match: { favorites: { $in: [userId] } } },
    {
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = processPagedRecipesResult({ result, userId });

  res.json({ ...response, page, limit, sort });
};

module.exports = getFavorite;
