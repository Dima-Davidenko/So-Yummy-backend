const express = require('express');
const ctrl = require('../../controllers/ownRecipes');
const {
  authenticate,
  validateBody,
  isValidId,
  upload,
  timeSecureRequest,
} = require('../../middlewares');
const { schemas } = require('../../models/ownRecipe');
const router = express.Router();
router.get('/', authenticate, ctrl.getOwnRecipes);
router.post(
  '/',
  authenticate,
  timeSecureRequest(),
  upload.single('fullImage'),
  validateBody(schemas.addSchema),
  ctrl.addOwnRecipe
);
router.get('/id/:id', authenticate, isValidId, ctrl.getOwnRecipeById);
router.delete('/id/:id', authenticate, timeSecureRequest(), isValidId, ctrl.deleteOwnById);

module.exports = router;
