'use strict';

/**
 * Article controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle article ( CRUD and etc )
 */

/*
 * Module variables
 */

let mongoose, Article;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Article = mongoose.model('Article');

/*
 * Expos
 */


/**
 * Article list
 */

exports.index = (req, res, next) => {
  let tpl = req.isAuthenticated() ? 'dashboard/articles/index' : 'articles/index';

  Article
    .find()
    .exec((err, articles) => {
      if (err) { return next(err); }

      if (Array.isArray(articles)) { return res.render(tpl, { articles: articles }); }

      return res.render(tpl);
    });
};

exports.store = (req, res, next) => {
  if ('type' in req.body && req.body.type !== 'wall_post_new') { return res.status(400).end(); }

  let post = req.body.object;

  Article.findOne({
    id: post.id
  }, (err, article) => {
    if (err) { return next(err); }

    if (article !== null) { return res.status(400).end(); }

    Article
      .create({
        id: post.id,
        created_by: post.created_by,
        date: post.date,
        text: post.text,
        attachments: 'attachments' in post ? post.attachments : [],
      }, (err, newArticle) => {
        if (err) { return next(err); }

        return res.status(200).end();
      });
  });
};

exports.edit = (req, res, next) => {
  let id = req.params.id || '';

  Article
    .findById(id)
    .exec((err, article) => {
      if (err) { return next(err); }

      if (article) { return res.render('dashboard/articles/edit', { article: article }); }

      return res.redirect('/dashboard/articles');
    });
};

exports.update = (req, res, next) => {
  let id = req.body.id || '';

  Article.update({ _id: id }, {
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
    slug: req.body.slug
  }, (err, article) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/articles');
  });
};

exports.destroy = (req, res, next) => {
  let id = req.params.id || '';

  Article
    .findByIdAndRemove(id)
    .exec((err, article) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/articles');
    });
};

// API
//------------------------------------------------

exports.indexJSON = (req, res, next) => {
  console.info('test');
  Article
    .find()
    .exec((err, articles) => {
      if (err) { return next(err); }

      if (Array.isArray(articles)) { return res.json(articles); }

      return res.json({
        code: 400,
        msg: 'Сервис находится на обслуживании'
      });
    });
};