const register = require('./register');
const verify = require('./verify');
const resendVerificationToken = require('./resendVerificationToken');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const setUserData = require('./setUserData');
const refresh = require('./refresh');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerificationToken: ctrlWrapper(resendVerificationToken),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  setUserData: ctrlWrapper(setUserData),
  refresh: ctrlWrapper(refresh),
};
