const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const timeSecureRequest = require('./timeSecureRequest');
const authenticateWithSessions = require('./authenticateWithSessions');
const googleAuthMiddlware = require('./googleAuthMiddlware');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  timeSecureRequest,
  authenticateWithSessions,
  googleAuthMiddlware,
};
