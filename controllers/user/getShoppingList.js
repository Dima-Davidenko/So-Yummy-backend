const { User } = require('../../models/user');

const getShoppingList = async (req, res) => {
  const result = await User.findById(req.user._id, '-createdAt -updatedAt').populate({
    path: 'shoppingList.productId',
    ref: 'ingredients',
  });
  const { shoppingList } = result.toObject();
  shoppingList.forEach(ingr => {
    ingr.title = ingr.productId.ttl;
    ingr.thumb = ingr.productId.thb;
    ingr.productId = ingr.productId._id;
  });
  res.json({ shoppingList });
};

module.exports = getShoppingList;
