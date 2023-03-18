const express = require('express');

const { validateBody, authenticate, timeSecureRequest } = require('../../middlewares/');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/signup', timeSecureRequest(), validateBody(schemas.registerSchema), ctrl.register);
router.get('/verify/:verificationToken', ctrl.verify);
router.post(
  '/verify/resend-email',
  timeSecureRequest(),
  validateBody(schemas.emailSchema),
  ctrl.resendVerificationToken
);
router.post('/login', timeSecureRequest(), validateBody(schemas.loginSchema), ctrl.login);
router.post('/logout', timeSecureRequest(), authenticate, ctrl.logout);
router.post('/refresh', timeSecureRequest(), validateBody(schemas.refreshSchema), ctrl.refresh);
router.get('/current', timeSecureRequest(), authenticate, ctrl.getCurrent);

module.exports = router;
