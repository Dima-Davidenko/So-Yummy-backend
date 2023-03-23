const express = require('express');

const {
  validateBody,
  authenticateWithSessions,
  upload,
  timeSecureRequest,
} = require('../../middlewares/');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/user');

const router = express.Router();

router.get('/shopping-list', authenticateWithSessions, ctrl.getShoppingList);
router.post(
  '/subscribe-list',
  authenticateWithSessions,
  timeSecureRequest(200),
  validateBody(schemas.emailSchema),
  ctrl.addEmailToSubscribeList
);
router.post('/unsubscribe', ctrl.removeEmailFromSubscriptionList);
router.post(
  '/shopping-list',
  authenticateWithSessions,
  timeSecureRequest(200),
  validateBody(schemas.product),
  ctrl.addProductToShoppingList
);
router.patch(
  '/shopping-list',
  authenticateWithSessions,
  timeSecureRequest(200),
  validateBody(schemas.product),
  ctrl.removeProductTFromShoppingList
);
router.post(
  '/set-user-info',
  authenticateWithSessions,
  timeSecureRequest(),
  upload.single('avatar'),
  validateBody(schemas.userNameSchema),
  ctrl.setUserData
);

module.exports = router;
