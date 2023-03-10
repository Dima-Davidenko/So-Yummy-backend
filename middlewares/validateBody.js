const { HttpError } = require('../helpers');

const validateBody = shema => {
  return (req, _, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
