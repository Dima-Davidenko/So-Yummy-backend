const express = require('express');

const ctrl = require('../../controllers/recipes');

const { authenticate, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);
router.get('/favorite', authenticate, ctrl.getFavorite);
router.patch('/favorite/:id', authenticate, isValidId, ctrl.updateFavoriteById);
router.patch('/like/:id', authenticate, isValidId, ctrl.updateLikeById);
router.get('/category/list', authenticate, ctrl.getAllCategories);
router.get('/category/:category', authenticate, ctrl.getRecipesByCategory);

router.patch('/:id', authenticate, isValidId, ctrl.getById);

// router.post('/private', authenticate, createIngrDB);

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
