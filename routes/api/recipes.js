const express = require('express');

const ctrl = require('../../controllers/recipes');

const { authenticate, validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/recipe');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, ctrl.addRecipe);

// router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// router.patch(
//   '/:id/favorite',
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavoriteById
// );

// router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
