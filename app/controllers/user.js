'use strict';

/**
 * USer controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 */

/*!
 * Module variables
 */

let mongoose, User;

/*!
 * Module dependencies
 */

mongoose = require('mongoose');
User = mongoose.model('User');

/*!
 * Expos
 */


/**
 * Login
 */

exports.login = (req, res) => {
  res.render('user/login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};
