const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const mongoose = require('mongoose');

const removeProductTFromShoppingList = async (req, res) => {
  const { productId, measure } = req.body;
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(productId)) {
    throw HttpError(400, `Wrong ID`);
  }
  const user = req.user.toObject();
  const productIndex = user.shoppingList.findIndex(item => {
    return String(item.productId) === String(productId);
  });

  if (productIndex === -1) {
    throw HttpError(404, `No product ${productId} in shopping list`);
  }

  const measureIndex = user.shoppingList[productIndex].measure.findIndex(item => {
    return item === measure;
  });

  if (measureIndex === -1) {
    throw HttpError(404, `No such measure ${measure} for product ${productId}`);
  }

  user.shoppingList[productIndex].measure.splice(measureIndex, 1);
  if (!user.shoppingList[productIndex].measure.length) {
    user.shoppingList.splice(productIndex, 1);
  }

  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      shoppingList: user.shoppingList,
    },
    { new: true }
  )
    .select('shoppingList')
    .populate({
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

module.exports = removeProductTFromShoppingList;
