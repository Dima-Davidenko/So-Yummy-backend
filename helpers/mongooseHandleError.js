const mongooseHandleError = (error, data, next) => {
  const { name, code } = error;
  if (name === 'MongoServerError' && code === 11000) {
    error.status = 409;
    error.message = `Email ${data.email} is in use`;
  } else {
    error.status = 400;
  }
  next();
};

module.exports = mongooseHandleError;
