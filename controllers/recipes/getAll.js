const { Recipe } = require('../../models/recipe');

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  const result = await Recipe.find(null, '-createdAt -updatedAt', options);
  res.json(result);
};

module.exports = getAll;
