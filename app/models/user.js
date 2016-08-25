'use strict';

/**
 * User model
 *
 * @module       :: model
 * @description  :: Represent user in database
 */

/*!
 * Module variables
 */

let mongoose, userPlugin, UserSchema, Schema, bcrypt;

/*!
 * Module dependencies
 */

mongoose = require('mongoose');
bcrypt   = require('bcryptjs');

// userPlugin = require('mongoose-user');
Schema = mongoose.Schema;

/**
 * User schema
 */

UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
});

/**
 * User plugin
 */

// UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.methods.authenticate = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

/**
 * Statics
 */

UserSchema.statics = {};

/**
 * Register
 */

mongoose.model('User', UserSchema);
