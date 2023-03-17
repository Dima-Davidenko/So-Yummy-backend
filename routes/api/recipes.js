const express = require('express');

const ctrl = require('../../controllers/recipes');

const { authenticate, isValidId } = require('../../middlewares');
// const goThroughAllRecipes = require('../../temp/api/goThroughAllRecipes');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);
router.get('/favorite', authenticate, ctrl.getFavorite);
router.patch('/favorite/:id', authenticate, isValidId, ctrl.updateFavoriteById);
router.patch('/like/:id', authenticate, isValidId, ctrl.updateLikeById);
router.get('/category/list', authenticate, ctrl.getAllCategories);
router.get('/category/:category', authenticate, ctrl.getRecipesByCategory);
router.get('/id/:id', authenticate, isValidId, ctrl.getById);
router.get('/title/:query', authenticate, ctrl.searchByTitle);
router.get('/ingredient/:query', authenticate, ctrl.searchByIngredient);

// router.post('/private', authenticate, goThroughAllRecipes);

module.exports = router;
