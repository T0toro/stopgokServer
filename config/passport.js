'use strict';

/**
 * Passport auth strategies
 */

/**
 * Module variables
 */

let mongoose, User, local;

/**
 * Module dependencies.
 */

mongoose = require('mongoose');
User = mongoose.model('User');

local = require('./passport/local');

/**
 * Expose
 */

module.exports = (passport, config) => {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.info('User id', id);
    User.findOne({
      _id: id
    }, (err, user) => {
      done(err, user);
    });
  });

  // use these strategies
  passport.use(local);
};
