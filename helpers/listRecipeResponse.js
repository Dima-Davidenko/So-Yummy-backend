const listRecipeResponse = (response, userId) => {
  const recipes = response.map(recipe => {
    const {
      _id,
      title,
      category,
      area,
      instructions,
      thumb,
      time,
      popularity,
      youtube,
      tags,
      ingridients,
      likes,
      favorites,
    } = recipe;
    const like = likes.includes(userId);
    const favorite = favorites.includes(userId);
    return {
      _id,
      title,
      category,
      area,
      instructions,
      thumb,
      time,
      popularity,
      youtube,
      tags,
      ingridients,
      like,
      favorite,
    };
  });
  return recipes;
};

module.exports = listRecipeResponse;
