const listRecipeResponse = (response, userId) => {
  const recipes = response.map(recipe => {
    const { _id, title, category, thumb, time, popularity, likes, favorites, description } = recipe;
    const like = likes.includes(userId);
    const favorite = favorites.includes(userId);
    return {
      _id,
      title,
      category,
      description,
      thumb,
      time,
      popularity,
      like,
      favorite,
    };
  });
  return recipes;
};

module.exports = listRecipeResponse;
