const { Recipe } = require('../../models/recipe');
const downloadRecipes = require('../../temp/downloadRecipes');

const addRecipe = async (req, res) => {
  const recipes = await downloadRecipes();
  recipes.forEach(async recipe => {
    const newRecipe = await Recipe.create(recipe);
    console.log('newRecipe-------------', newRecipe);
  });
  res.json(recipes);
};

module.exports = addRecipe;
