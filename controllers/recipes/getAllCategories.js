const categoriesList = require('../../data/categoriesList.json');

const getAllCategories = async (req, res) => {
  res.json(categoriesList);
};

module.exports = getAllCategories;
