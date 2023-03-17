const { User } = require('../../models/user');
const {
  MAX_SHOPPINGLIST_LENGTH,
  MAX_SHOPPINGLIST_MEASURE_LENGTH,
} = require('../../data/constants');
const { HttpError } = require('../../helpers');
const mongoose = require('mongoose');
const { Ingredient } = require('../../models/ingredient');

const addProductToShoppingList = async (req, res) => {
  const { productId, measure } = req.body;
  const user = req.user.toObject();
  if (user.shoppingList.length >= MAX_SHOPPINGLIST_LENGTH) {
    throw HttpError(
      403,
      `You have reached the maximum length (${MAX_SHOPPINGLIST_LENGTH}) of your shopping list`
    );
  }
  const ObjectId = mongoose.Types.ObjectId;

  if (!ObjectId.isValid(productId)) {
    throw HttpError(400, `Wrong ID`);
  }

  const ingr = await Ingredient.findById(productId);
  if (!ingr) {
    throw HttpError(404, `No such ingredient`);
  }

  let result = [];
  const productIndex = user.shoppingList.findIndex(item => {
    return String(item.productId) === String(productId);
  });

  if (productIndex !== -1) {
    if (user.shoppingList[productIndex].measure.length >= MAX_SHOPPINGLIST_MEASURE_LENGTH) {
      throw HttpError(
        403,
        `You have reached the maximum length (${MAX_SHOPPINGLIST_MEASURE_LENGTH}) of measure field for this item`
      );
    }
    user.shoppingList[productIndex].measure.push(measure);
    result = await User.findByIdAndUpdate(
      user._id,
      { shoppingList: user.shoppingList },
      { new: true }
    )
      .select('shoppingList')
      .populate({
        path: 'shoppingList.productId',
        ref: 'ingredients',
      });
  } else {
    result = await User.findByIdAndUpdate(
      user._id,
      {
        $push: { shoppingList: { productId, measure } },
      },
      { new: true }
    )
      .select('shoppingList')
      .populate({
        path: 'shoppingList.productId',
        ref: 'ingredients',
      });
  }
  const { shoppingList } = result.toObject();
  shoppingList.forEach(ingr => {
    ingr.title = ingr.productId.ttl;
    ingr.thumb = ingr.productId.thb;
    ingr.productId = ingr.productId._id;
  });
  res.json({ shoppingList });
};

module.exports = addProductToShoppingList;
