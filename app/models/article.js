/**
 * Article
 *
 * @module       :: model
 * @description  :: Represent articles in database
 */

/*
 * Module variables
 */

let mongoose, timestamps, Schema, ArticleSchema;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
timestamps = require('mongoose-timestamp');
Schema = mongoose.Schema;

/*
 * ArticleSchema
 */

ArticleSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: ''
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Plugins
 */

ArticleSchema.plugin(timestamps);

/**
 * Methods
 */

ArticleSchema.methods = {};

/**
 * Statics
 */

ArticleSchema.statics = {};

/**
 * Register
 */

mongoose.model('Article', ArticleSchema);
