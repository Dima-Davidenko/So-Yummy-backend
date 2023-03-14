const { OwnRecipe } = require('../../models/ownRecipe');

const addOwnRecipe = async (req, res) => {
  const { title, category, about, instructions, time, favorite, ingridients } = req.body;
  const newRecipe = await OwnRecipe.create({
    title,
    category,
    about,
    instructions,
    time,
    favorite,
    ingridients,
    owner: req.user._id,
  });
  res.json(newRecipe);
};

module.exports = addOwnRecipe;
