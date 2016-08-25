/**
 * Set some settings then app start
 *
 * @module      :: app
 * @description :: this module start once then app start
 */

/**
 * Module variables
 */

let mongoose, User, bcrypt, salt;

/**
 * Module dependencies
 */

bcrypt   = require('bcryptjs');
mongoose = require('mongoose');
User     = mongoose.model('User');

/*!
 * Expose
 */

module.exports = (app, passport) => {

  User.findOne({
    name: 'admin'
  }, (err, user) => {
    if (err) { return console.info('During the users search, following mistakes have happend: ', err); }

    if (!user) {
      User.create({
        name: 'admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123', 8),
      }, (err, user) => {
        if (err) { return console.info('When user was creating, some error arose: ', err); }

        return true;
      });
    }
  });
}
