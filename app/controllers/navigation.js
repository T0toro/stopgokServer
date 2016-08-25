'use strict';

/**
 * Nav controller
 *
 * @module       :: controller
 * @description  :: keep navigation app logic ( CRUD and etc )
 */

/**
 * Module dependencies
 */

const mongoose = require('mongoose'),
      Link = mongoose.model('Link');

/*============= Expos ============== */

/**
 * Nav list
 */

exports.index = (req, res, next) => {
  let tpl = req.isAuthenticated() ? 'dashboard/nav/index' : 'nav/index';

  Link
    .find()
    .exec((err, links) => {
      if (err) { return next(err); }

      console.info(links);

      if (Array.isArray(links)) { return res.render(tpl, { links: links }); }

      return res.render(tpl);
    });
};

exports.create = (req, res) => res.render('dashboard/nav/create');

exports.store = (req, res, next) => {
  Link.create({
    anchor: req.body.anchor,
    href: req.body.href,
  }, (err, links) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/nav');
  });
};

exports.edit = (req, res, next) => {
  let id = req.params.id || '';

  Link
    .findById(id)
    .exec((err, link) => {
      if (err) { return next(err); }


      if (link) { return res.render('dashboard/nav/edit', { link: link }); }

      return res.redirect('/dashboard/nav');
    });
};

exports.update = (req, res, next) => {
  let id = req.body.id || '';

  Link.update({ _id: id }, {
    anchor: req.body.anchor,
    href: req.body.href,
  }, (err, link) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/nav');
  });
};

exports.destroy = (req, res, next) => {
  let id = req.params.id || '';

  Link
    .findByIdAndRemove(id)
    .exec((err, link) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/Navs');
    });
};
