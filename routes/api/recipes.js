const express = require('express');

const ctrl = require('../../controllers/recipes');

const { authenticateWithSessions, isValidId } = require('../../middlewares');
// const goThroughAllRecipes = require('../../temp/api/goThroughAllRecipes');

const router = express.Router();

router.get('/', authenticateWithSessions, ctrl.getAll);
router.get('/main-page', authenticateWithSessions, ctrl.getMainPage);
router.get('/favorite', authenticateWithSessions, ctrl.getFavorite);
router.patch('/favorite/:id', authenticateWithSessions, isValidId, ctrl.updateFavoriteById);
router.patch('/like/:id', authenticateWithSessions, isValidId, ctrl.updateLikeById);
router.get('/category/list', authenticateWithSessions, ctrl.getAllCategories);
router.get('/category/:category', authenticateWithSessions, ctrl.getRecipesByCategory);
router.get('/id/:id', authenticateWithSessions, isValidId, ctrl.getById);
router.get('/title/:query', authenticateWithSessions, ctrl.searchByTitle);
router.get('/ingredient/:query', authenticateWithSessions, ctrl.searchByIngredient);
router.get('/ingredients', authenticateWithSessions, ctrl.getAllIngredients);

// router.post('/private', goThroughAllRecipes);

module.exports = router;
