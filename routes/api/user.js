const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares/');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/user');

const router = express.Router();

router.get('/shopping-list', authenticate, ctrl.getShoppingList);
router.post(
  '/shopping-list',
  authenticate,
  validateBody(schemas.product),
  ctrl.addProductToShoppingList
);
router.delete('/shopping-list/:listItemId', authenticate, ctrl.removeProductTFromShoppingList);
router.post(
  '/set-user-info',
  authenticate,
  upload.single('avatar'),
  validateBody(schemas.userNameSchema),
  ctrl.setUserData
);

module.exports = router;
