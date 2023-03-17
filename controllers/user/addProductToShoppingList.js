const { User } = require('../../models/user');
const { MAX_SHOPPINGLIST_LENGTH } = require('../../data/constants');
const { HttpError } = require('../../helpers');

const addProductToShoppingList = async (req, res) => {
  const { productId, measure } = req.body;
  const listLength = req.user.shoppingList.length;
  if (listLength >= MAX_SHOPPINGLIST_LENGTH) {
    throw HttpError(
      403,
      `You have reached the maximum length (${MAX_SHOPPINGLIST_LENGTH}) of your shopping list`
    );
  }
  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { shoppingList: { productId, measure } },
    },
    { new: true, lean: true }
  ).select('shoppingList');
  const listItemId = result?.shoppingList?.at(-1)?._id;
  res.json({ listItemId, total: listLength });
};

module.exports = addProductToShoppingList;
