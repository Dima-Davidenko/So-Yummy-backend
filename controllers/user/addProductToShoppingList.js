const { User } = require('../../models/user');

const addProductToShoppingList = async (req, res) => {
  const { productId, measure } = req.body;
  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { shoppingList: { productId, measure } },
    },
    { new: true, lean: true }
  ).select('shoppingList');
  const listItemId = result?.shoppingList?.at(-1)?._id;
  res.json({ listItemId });
};

module.exports = addProductToShoppingList;
