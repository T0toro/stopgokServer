'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose'),
      async    = require('async'),
      Article  = mongoose.model('Article'),
      Link     = mongoose.model('Link');

/*!
 * Expos
 */

exports.index = (req, res, next) => {
  async.parallel([(cb) => {
    Article
      .find({ status: 1 })
      .exec((err, articles) => {
        if (err) { return cb(err); }

        return cb(null, articles);
      });
  }, (cb) => {
    Link
      .find()
      .exec((err, links) => {
        if (err) { return cb(err); }

        return cb(null, links);
      });
  }], (err, result) => {
    if (err) { return next(err); }

    res.render('home/index', {
      title: 'Node Express Mongoose Boilerplate',
      articles: result[0],
      links: result[1]
    });
  });
};
