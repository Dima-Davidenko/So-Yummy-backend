const express = require('express');
const ctrl = require('../../controllers/ownRecipes');
const { authenticate, validateBody, isValidId, upload } = require('../../middlewares');
const { schemas } = require('../../models/ownRecipe');
const router = express.Router();
router.get('/', authenticate, ctrl.getOwnRecipes);
router.post(
  '/',
  authenticate,
  upload.single('image'),
  validateBody(schemas.addSchema),
  ctrl.addOwnRecipe
);
router.delete('/id/:id', authenticate, isValidId, ctrl.deleteOwnById);

module.exports = router;
