const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { page = 1, limit = 20, favorite = null } = req.query;
  const filter = {
    owner: req.user._id,
  };
  const options = {
    skip: (page - 1) * limit,
    limit,
  };
  if (favorite !== null) filter.favorite = favorite;
  const result = await Contact.find(filter, '-createdAt -updatedAt', options).populate(
    'owner',
    'name email'
  );
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const owner = req.user._id;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: 'Delete success',
  });
};

// module.exports = {
//   getAll: ctrlWrapper(getAll),
//   geById: ctrlWrapper(getContactById),
//   add: ctrlWrapper(addContact),
//   updateById: ctrlWrapper(updateContactById),
//   updateFavoriteById: ctrlWrapper(updateFavoriteById),
//   deleteById: ctrlWrapper(deleteContactById),
// };
