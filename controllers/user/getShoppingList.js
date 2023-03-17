const { User } = require('../../models/user');
// const { Ingredient } = require('../../models/ingredient');

const getShoppingList = async (req, res) => {
  // const result = await (
  //   await User.findById(req.user._id).select('shoppingList')
  // ).populate({
  //   path: 'shoppingList.productId',
  //   model: 'Recipes.ingredients',
  // });
  const result = await User.aggregate([
    { $match: { _id: req.user._id } },
    {
      $lookup: {
        from: 'recipes.ingredients',
        localField: 'shoppingList',
        foreignField: '_id',
        as: 'ingredients',
      },
    },
    // {
    //   ...getFacetObject({ sortOpts, skip, limit }),
    // },
  ]);
  // const { shoppingList } = result.toObject();
  // shoppingList.forEach(ingr => {
  //   ingr.listItemId = ingr._id;
  //   ingr.title = ingr.productId.ttl;
  //   ingr.desc = ingr.productId.desc;
  //   ingr.type = ingr.productId.t;
  //   ingr.thumb = ingr.productId.thb;
  //   ingr.productId = ingr.productId._id;
  //   delete ingr._id;
  // });
  // res.json({ shoppingList });
  res.json(result);
};

module.exports = getShoppingList;
