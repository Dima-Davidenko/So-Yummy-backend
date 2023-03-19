const register = require('./register');
const verify = require('./verify');
const resendVerificationToken = require('./resendVerificationToken');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const refresh = require('./refresh');
const sendPasswordResetEmail = require('./sendPasswordResetEmail');
const resetPassword = require('./resetPassword');
const setNewPassword = require('./setNewPassword');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerificationToken: ctrlWrapper(resendVerificationToken),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
  sendPasswordResetEmail: ctrlWrapper(sendPasswordResetEmail),
  resetPassword: ctrlWrapper(resetPassword),
  setNewPassword: ctrlWrapper(setNewPassword),
};
