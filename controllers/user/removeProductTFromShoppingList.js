const { User, schemas } = require('../../models/user');
const { HttpError } = require('../../helpers');

const removeProductTFromShoppingList = async (req, res) => {
  const { listItemId } = req.params;
  const { error } = schemas.listItemId.validate({ listItemId });
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { shoppingList: { _id: listItemId } },
    },
    { lean: true }
  ).select('shoppingList');
  if (
    result.shoppingList.some(item => {
      return `${item._id}` === listItemId;
    })
  ) {
    res.json({ message: `Product ${listItemId} has been deleted` });
  } else {
    throw HttpError(404, `Product ${listItemId} has not been found`);
  }
};

module.exports = removeProductTFromShoppingList;
