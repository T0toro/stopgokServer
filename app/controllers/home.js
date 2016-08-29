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
      .find()
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
      title: 'Рабочая группа по проблеме Томинского ГОКа',
      articles: result[0],
      links: result[1]
    });
  });
};
