const { Recipe } = require('../../models/recipe');

const getAll = async (req, res) => {
  const { page = 1, limit = 20, favorite = null } = req.query;
  const filter = {
    owner: req.user._id,
  };
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  if (favorite !== null) filter.favorite = favorite;
  const result = await Recipe.find(filter, '-createdAt -updatedAt', options).populate(
    'owner',
    'name email'
  );
  res.json(result);
};

module.exports = getAll;
