/**
 * Article
 *
 * @module       :: model
 * @description  :: Represent articles in database
 */

/*
 * Module dependencies
 */



const mongoose        = require('mongoose'),
      timestamps      = require('mongoose-timestamp');

/*
 * ArticleSchema
 */

let ArticleSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0
  },
  created_by: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  attachments: {
    type: Array,
    default: []
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
