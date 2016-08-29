'use strict';

/**
 * App routes
 *
 * @module      :: app
 * @description :: main app routes
 */

/**
 * Module dependencies
 */

const home       = require('./../app/controllers/home'),
      user       = require('./../app/controllers/user'),
      article    = require('./../app/controllers/article'),
      navigation = require('./../app/controllers/navigation');

/*!
 * Expose
 */

module.exports = (app, passport) => {
  app.use((req, res, next) => {
    if (!req.url.search('.*dashboard.*') && !req.isAuthenticated()) {
      return res.redirect('/login');
    }

    res.locals.isAuthenticated = req.isAuthenticated();

    return next();
  });

  // Home
  // --------------------------------------------

  app.get('/', home.index);

  // Article
  // --------------------------------------------

  app.get('/articles', article.index);

  // --------------------------------------------
  // ---------------- Dashboard -----------------
  // --------------------------------------------

  app.get('/dashboard', (req, res) => {
    res.render('dashboard/home/index');
  });

  // Login/Logout
  // --------------------------------------------

  app.get('/login', user.login);
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
    failureFlash: true
  }));

  app.get('/logout', user.logout);

  // Article
  // --------------------------------------------

  app.get('/dashboard/articles', article.index);
  app.get('/dashboard/articles/edit/:id', article.edit);
  app.get('/dashboard/articles/destroy/:id', article.destroy);

  app.post('/dashboard/articles/update', article.update);

  // VK Api
  // --------------------------------------------
  app.get('/articles/all', article.indexJSON);
  app.post('/callback', article.store);

  // Navigation
  // --------------------------------------------

  app.get('/dashboard/nav', navigation.index);
  app.get('/dashboard/nav/create', navigation.create);
  app.get('/dashboard/nav/edit/:id', navigation.edit);
  app.get('/dashboard/nav/destroy/:id', navigation.destroy);

  app.post('/dashboard/nav/store', navigation.store);
  app.post('/dashboard/nav/update', navigation.update);
};
