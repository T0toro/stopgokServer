'use strict';

/**
 * Link
 *
 * @module       :: model
 * @description  :: keep links in database
 */

/*
 * Module variables
 */

let mongoose, Schema, LinkSchema;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Schema = mongoose.Schema;

/*
 * LinkSchema
 */

LinkSchema = new Schema({
  anchor: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  child: {
    type: Array,
    default: []
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

LinkSchema.methods = {};

/**
 * Statics
 */

LinkSchema.statics = {};

/**
 * Register
 */

mongoose.model('Link', LinkSchema);
