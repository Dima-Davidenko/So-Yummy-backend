const express = require('express');

const { validateBody, authenticate } = require('../../middlewares/');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/signup', validateBody(schemas.registerSchema), ctrl.register);
router.get('/verify/:verificationToken', ctrl.verify);
router.post(
  '/verify/resend-email',
  validateBody(schemas.emailSchema),
  ctrl.resendVerificationToken
);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.post('/refresh', validateBody(schemas.refreshSchema), ctrl.refresh);
router.get('/current', authenticate, ctrl.getCurrent);

router.post(
  '/reset/send-reset-link',
  validateBody(schemas.emailSchema),
  ctrl.sendPasswordResetEmail
);
router.post('/reset/reset-password', validateBody(schemas.resetSchema), ctrl.resetPassword);
router.post(
  '/reset/set-new-password',
  validateBody(schemas.setNewPasswordSchema),
  ctrl.setNewPassword
);

module.exports = router;
