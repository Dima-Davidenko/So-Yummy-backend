const { User } = require('../../models/user');
const { Ingridient } = require('../../models/ingridient');

const getShoppingList = async (req, res) => {
  const result = await (
    await User.findById(req.user._id).select('shoppingList')
  ).populate({
    path: 'shoppingList.productId',
    model: Ingridient,
  });
  const { shoppingList } = result.toObject();
  shoppingList.forEach(ingr => {
    ingr.listItemId = ingr._id;
    ingr.title = ingr.productId.ttl;
    ingr.desc = ingr.productId.desc;
    ingr.type = ingr.productId.t;
    ingr.thumb = ingr.productId.thb;
    ingr.productId = ingr.productId._id;
    delete ingr._id;
  });
  res.json({ shoppingList });
};

module.exports = getShoppingList;
