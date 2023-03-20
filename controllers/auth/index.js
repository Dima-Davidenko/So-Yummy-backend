const register = require('./register');
const verify = require('./verify');
const resendVerificationToken = require('./resendVerificationToken');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const logoutWithSessions = require('./logoutWithSessions');
const refresh = require('./refresh');
const sendPasswordResetEmail = require('./sendPasswordResetEmail');
const resetPassword = require('./resetPassword');
const setNewPassword = require('./setNewPassword');
const loginWithSessions = require('./loginWithSessions');
const refreshWithSessions = require('./refreshWithSessions');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerificationToken: ctrlWrapper(resendVerificationToken),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  logoutWithSessions: ctrlWrapper(logoutWithSessions),
  refresh: ctrlWrapper(refresh),
  sendPasswordResetEmail: ctrlWrapper(sendPasswordResetEmail),
  resetPassword: ctrlWrapper(resetPassword),
  setNewPassword: ctrlWrapper(setNewPassword),
  loginWithSessions: ctrlWrapper(loginWithSessions),
  refreshWithSessions: ctrlWrapper(refreshWithSessions),
};
