const express = require('express');
const ctrl = require('../../controllers/ownRecipes');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/ownRecipe');
const router = express.Router();
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addOwnRecipe);
router.patch('/favorite/:id', authenticate, isValidId, ctrl.updateOwnFavoriteById);

module.exports = router;
