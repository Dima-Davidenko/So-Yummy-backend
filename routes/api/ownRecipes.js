const express = require('express');
const ctrl = require('../../controllers/ownRecipes');
const {
  authenticateWithSessions,
  validateBody,
  isValidId,
  upload,
  timeSecureRequest,
} = require('../../middlewares');
const { schemas } = require('../../models/ownRecipe');
const router = express.Router();
router.get('/', authenticateWithSessions, ctrl.getOwnRecipes);
router.post(
  '/',
  authenticateWithSessions,
  timeSecureRequest(),
  upload.single('fullImage'),
  validateBody(schemas.addSchema),
  ctrl.addOwnRecipe
);
router.get('/id/:id', authenticateWithSessions, isValidId, ctrl.getOwnRecipeById);
router.delete(
  '/id/:id',
  authenticateWithSessions,
  timeSecureRequest(),
  isValidId,
  ctrl.deleteOwnById
);

module.exports = router;
